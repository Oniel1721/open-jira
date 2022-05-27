import  mongoose, { Model, Schema } from 'mongoose'
import { Entry, EntryStatus, validEntryStatus } from '../interfaces';


export interface IEntry extends Entry{}

const entrySchema = new Schema({
    description: {type: String, required: true},
    createdAt: {type: Number},
    status: {
        type: String,
        enum: {
            values: validEntryStatus,
            message: ' no es un estado permitido'
        },
        default: EntryStatus.PENDING,
    },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel
