import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    }
},{timestamps:true,versionKey:false});

const Event = mongoose.model("Event",eventSchema);
export default Event;