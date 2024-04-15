import mongoose from 'mongoose';
import { autoInc } from 'auto-increment-group';
import mongoosePaginate from 'mongoose-paginate-v2';

const courseSchema = new mongoose.Schema({
  sn:{
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  ratedBy: {
    type: Number,
    default: 0
  },
  content: [{
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    video: {
      type: String
    },
    photo: {
      type: String
    },
    description: {
      type: String
    }
  }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  versionKey: '__v',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

courseSchema.plugin(autoInc, {
  field: "sl",
  digits: 4,
  startAt: 1,
  incrementBy: 1,
  unique: false
});

courseSchema.plugin(mongoosePaginate);

const Course = mongoose.model('Course', courseSchema);

export default Course;