import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";


// API controller function to manage Clerk users with database
const clerkWebhooks = async (req, res) => {
    try {
        // Verify the webhook signature first
        const payload = JSON.stringify(req.body);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const verified = whook.verify(payload, headers);

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                // Validate required fields exist
                if (!data.id || !data.email_addresses?.[0]?.email_address) {
                    return res.status(400).json({ error: "Missing required user data" });
                }

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || null,  // Fixed typo in image_url
                };
                
                await User.create(userData);
                return res.status(201).json({ success: true });
            }

            case 'user.updated': {
                if (!data.id) {
                    return res.status(400).json({ error: "Missing user ID" });
                }

                const userData = {
                    email: data.email_addresses?.[0]?.email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || null,  // Fixed typo in image_url
                };

                // Only update fields that are provided
                const updateData = {};
                if (userData.email) updateData.email = userData.email;
                if (userData.name) updateData.name = userData.name;
                if (userData.imageUrl !== undefined) updateData.imageUrl = userData.imageUrl;

                await User.findByIdAndUpdate(data.id, updateData, { new: true });
                return res.status(200).json({ success: true });
            }

            case 'user.deleted': {
                if (!data.id) {
                    return res.status(400).json({ error: "Missing user ID" });
                }
                
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(400).json({ error: "Unhandled event type" });
        }
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Internal server error" 
        });
    }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebHooks = async(request, response) => {
    const sig = request.headers['stripe-signature'];
    let events;
    try {
        events = Stripe.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the events
    switch (events.type) {
        case 'payment_intent.succeeded':{
            const paymentIntent = events.data.object;
            const paymentIntentId = paymentIntent.id;
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {purchaseId} = session.data[0].metadata;
            const purchaseData = await Purchase.findById(purchaseId)
            const userData = await User.findById(purchaseData.userId)
            const courseData = await Course.findById(purchaseData.courseId.toString())
            courseData.enrolledStudents.push(userData)
            await courseData.save()

            userData.enrolledCourses.push(courseData._id)
            await userData.save()

            purchaseData.status = 'completed'
            await purchaseData.save()
            
            break;}
        case 'payment_intent.payment_failed':{
            const paymentIntent = events.data.object;
            const paymentIntentId = paymentIntent.id;
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {purchaseId} = session.data[0].metadata;
            const purchaseData = await Purchase.findById(purchaseId)
            purchaseData.status = 'failed'
            await purchaseData.save()
            break;
        }
        // handle other events types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    // Return a response to acknowledge receipt of the events
    response.json({received:true})
}

export default clerkWebhooks;