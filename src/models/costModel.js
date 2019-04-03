import mongoose from 'mongoose';
import { notEmptyStringValidator } from '../validators';

const costModel = new mongoose.Schema({
  value: { type: Number, required: true },
  title: { type: String, required: true, validate: notEmptyStringValidator },
  type: { type: String, reaquired: true, validate: notEmptyStringValidator },
  createdAd: { type: Date, default: Date.now }
});

export default mongoose.model('Cost', costModel);
