import { Schema } from "mongoose";

export const HouseSchema = new Schema(
    {
        bedrooms: { type: Number, required: true, min: 1, max: 30 },
        bathrooms: { type: Number, required: true, min: 1, max: 30 },
        price: { type: Number, required: true, min: 1, max: 20000000 },
        imgUrl: { type: String, required: true, minLength: 5, maxLength: 500 },
        description: { type: String, maxLength: 500 },
        levels: { type: Number, required: true, min: 1, max: 30 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)