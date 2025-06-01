import { Webhook} from 'svix';
import User from '../models/User.js';


//! API Controller Function to Manage clerk User with databse

export const clerkWebhook = async (req, res) => {
    try {
        // we will save the info when user is created , deleted or updated

        // create a svix instance with clerl webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // verify the webhook signature OR hEADERS

        await webhook.verify({
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        }); 

        // Getting data from request body
        const {data , type} = req.body;

        switch(type){
            //!save the user data when user is created
            case 'user.created':{
                const userData = {
                    _id : data.id,
                    name : data.first_name + " " + data.last_name,
                    email : data.email_addresses[0].email_address,
                    resume :'',
                    image : data.image_url
                }
                await User.create(userData);
                res.json({})
                break;

            }
            case 'user.updated':{
                const userData = {
                    name : data.first_name + " " + data.last_name,
                    email : data.email_addresses[0].email_address,
                    image : data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData, {new: true});
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id);
            }
            default:
                break;
                
             
        }
    } catch (error) {
        console.error("Error in clerk webhook:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}