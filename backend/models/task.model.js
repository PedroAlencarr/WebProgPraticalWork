const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true, 
            trim: true 
        },
        description: {
            type: String,
            trim: true 
        },
        type: {
            type: String,
            required: true,
            enum: ['To Do', 'Doing', 'Done', 'Rejected'], 
        },
        board: {
            type: Schema.Types.ObjectId, 
            ref: 'Board', 
            required: true,
        },
    },
    {
        timestamps: true 
    }
);

export const Task = mongoose.model("Task", TaskSchema);