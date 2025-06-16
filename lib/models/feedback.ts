import mongoose, { Schema, model, models } from 'mongoose';

const FeedbackSchema = new Schema({
    message: { type: String, required: true },
}, { timestamps: true });

export const Feedback = models.Feedback || model('Feedback', FeedbackSchema);
