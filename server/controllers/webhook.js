import { Webhook} from 'svix';
import User from '../models/User.js';


//! API Controller Function to Manage clerk User with databse

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

        // we will save the info when user is created , deleted or updated

        // create a svix instance with clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // verify the webhook signature OR hEADERS
        try {
            await webhook.verify({
                "svix-id": req.headers['svix-id'],
                "svix-timestamp": req.headers['svix-timestamp'],
                "svix-signature": req.headers['svix-signature']
            });
            console.log('Webhook signature verified successfully');
        } catch (verifyError) {
            console.error('Webhook signature verification failed:', verifyError);
            return res.status(401).json({ error: 'Invalid webhook signature' });
        }

        // Getting data from request body
        const {data, type} = req.body;
        console.log('Processing webhook type:', type, 'with data:', data);

        switch(type) {
            //!save the user data when user is created
            case 'user.created':{
                const userData = {
                    _id : data.id,
                    name : data.first_name + " " + data.last_name,
                    email : data.email_addresses[0].email_address,
                    resume :'',
                    image : data.image_url
                }
                console.log('Creating user with data:', userData);
                const createdUser = await User.create(userData);
                console.log('User created successfully:', createdUser);
                return res.json({ success: true, user: createdUser });
            }
            case 'user.updated':{
                const userData = {
                    name : data.first_name + " " + data.last_name,
                    email : data.email_addresses[0].email_address,
                    image : data.image_url
                }
                console.log('Updating user with data:', userData);
                const updatedUser = await User.findByIdAndUpdate(data.id, userData, {new: true});
                console.log('User updated successfully:', updatedUser);
                return res.json({ success: true, user: updatedUser });
            }
            case 'user.deleted':{
                console.log('Deleting user with ID:', data.id);
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log('User deleted successfully:', deletedUser);
                return res.json({ success: true, user: deletedUser });
            }
            default:
                console.log('Unhandled webhook type:', type);
                return res.status(400).json({ error: 'Unhandled webhook type' });
        }
    } catch (error) {
        console.error("Error in clerk webhook:", error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}