const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, 
        },
        description: {
            type: String,
            trim: true, 
        },
        createdBy: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true, 
        },
        sharedWith: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('Board', BoardSchema);
