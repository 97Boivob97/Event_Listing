import Event from "../models/eventModel.js";
import mongoose from "mongoose";

export const createEvent = async (request,response)=>{
    try{
        const { title,date,time,location,description,category } = request.body;
        if(!title || !date || !time || !location){
            return response.status(400).json({success:false,message:"Title,date,time,location are required!"});
        }
        const event = await Event.create({title,date,time,location,description,category,createdBy:request.user.id});
        response.status(201).json({
            success:true,
            message:"Event created Successfully!",
            event
        })
    }
    catch(error){
        console.error(error);
        return response.status(500).json({success:false,message:"Event Creation Failed!"});
    }
};

export const allEvents = async (_,response)=>{
    try{
        const events = await Event.find().sort({createdAt:-1}).populate("createdBy","name");
        const totalEvents = await Event.countDocuments();
        response.status(200).json({
            success:true,
            message:"All Events Retrieved Successfully",
            totalEvents,
            events
        });
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            success:false,
            message:"Failed to retrieve events!"
        });
    }
};

export const eventById = async (request,response)=>{
    try{
        const eventId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return response.status(400).json({ message: "Invalid event ID" });
        }
        const event = await Event.findById(eventId).populate("createdBy","name");
        if(!event){
            return response.status(404).json({ success:false, message: "Event not found" });
        }
        response.status(200).json({
            success:true,
            message:"Event Found",
            event
        });
        
    }
    catch(error){
        console.error(error);
        response.status(500).json({ success:false, message: "Failed to fetch event" });
    }
};

export const updateEvent = async (request,response)=>{
    try{
        const eventId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return response.status(400).json({ message: "Invalid event ID" });
        }
        const event = await Event.findById(eventId);
        if(!event){
            return response.status(404).json({ success:false, message: "Event not found" });
        }
        if (event.createdBy.toString() !== request.user.id) {
            return response.status(403).json({ success:false, message: "Unauthorized" });
        }
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            request.body,
            { new: true, runValidators:true }
        );
        if(!updatedEvent){
            return response.status(404).json({
                    success: false,
                    message: "Event not found!"
                });
        }
         response.status(200).json({
            success:true,
            message:"Event Updated Successfully!",
            event:updatedEvent
        });
    }

    catch(error){
        console.error(error);
        response.status(500).json({
            success: false,
            message:"Failed to Update Event"
        });
    }
};


export const deleteEvent = async (request,response)=>{
    try{
        const eventId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return response.status(400).json({ message: "Invalid event ID" });
        }
        const event = await Event.findById(eventId);

        if (!event) {
            return response.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (event.createdBy.toString() !== request.user.id) {
            return response.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        response.status(200).json({
            success:true,
            message:"Event Deleted Successfully",
            event:deletedEvent
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            success:false,
            message:"Failed to Delete Event!"
        });
    }

};
