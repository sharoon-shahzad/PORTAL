import express from 'express';
import {Webhook} from 'svix';
import User from '../models/User.js';

//! API Controller Function to Manage clerk User with database

export const clerkWebhook = async (req, res) => {
    try {
        // Check if webhook secret exists
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error('CLERK_WEBHOOK_SECRET is not set in environment variables');
            return res.status(500).json({ error: 'Webhook secret not configured' });
        }

        console.log('Webhook received:', {
            headers: req.headers,
            body: req.body
        });

        // Create a svix instance with clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Get the raw body as string for verification
        const payload = JSON.stringify(req.body);
        
        // Get headers
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        };

        console.log('Verification headers:', headers);

        // Verify the webhook signature
        let evt;
        try {
            evt = webhook.verify(payload, headers);
            console.log('Webhook signature verified successfully');
        } catch (verifyError) {
            console.error('Webhook signature verification failed:', verifyError);
            return res.status(401).json({ error: 'Invalid webhook signature' });
        }

        // Getting data from verified event
        const {data, type} = evt;
        console.log('Processing webhook type:', type, 'with data:', data);

        switch(type) {
            //! Save the user data when user is created
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    email: data.email_addresses?.[0]?.email_address || '',
                    resume: '',
                    image: data.image_url || ''
                }
                console.log('Creating user with data:', userData);
                
                try {
                    const createdUser = await User.create(userData);
                    console.log('User created successfully:', createdUser);
                    return res.status(200).json({ success: true, user: createdUser });
                } catch (dbError) {
                    console.error('Database error creating user:', dbError);
                    return res.status(500).json({ error: 'Failed to create user' });
                }
            }
            
            case 'user.updated': {
                const userData = {
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    email: data.email_addresses?.[0]?.email_address || '',
                    image: data.image_url || ''
                }
                console.log('Updating user with data:', userData);
                
                try {
                    const updatedUser = await User.findByIdAndUpdate(data.id, userData, {new: true});
                    console.log('User updated successfully:', updatedUser);
                    return res.status(200).json({ success: true, user: updatedUser });
                } catch (dbError) {
                    console.error('Database error updating user:', dbError);
                    return res.status(500).json({ error: 'Failed to update user' });
                }
            }
            
            case 'user.deleted': {
                console.log('Deleting user with ID:', data.id);
                
                try {
                    const deletedUser = await User.findByIdAndDelete(data.id);
                    console.log('User deleted successfully:', deletedUser);
                    return res.status(200).json({ success: true, user: deletedUser });
                } catch (dbError) {
                    console.error('Database error deleting user:', dbError);
                    return res.status(500).json({ error: 'Failed to delete user' });
                }
            }
            
            default:
                console.log('Unhandled webhook type:', type);
                return res.status(200).json({ success: true, message: 'Webhook received but not processed' });
        }
    } catch (error) {
        console.error("Error in clerk webhook:", error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}