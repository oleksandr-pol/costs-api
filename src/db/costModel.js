import mongoose from 'mongoose';
import moment from 'moment';

import { notEmptyStringValidator } from './validators';

const costSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  title: { type: String, required: true, validate: notEmptyStringValidator },
  type: { type: String, reaquired: true, validate: notEmptyStringValidator },
  createdAt: { type: Date, default: moment.utc() }
});

export default mongoose.model('Cost', costSchema);
