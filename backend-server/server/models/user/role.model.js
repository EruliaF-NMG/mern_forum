import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
  },
  permissions: [{ type: mongoose.Schema.ObjectId, ref: 'Permission' }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
  },
  updated_by: {
    type: mongoose.Schema.ObjectId,
  },
  updated_at: Date,
});

export default mongoose.model('Role', roleSchema);
