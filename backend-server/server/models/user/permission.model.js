import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
  },
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

export default mongoose.model('Permission', permissionSchema);
