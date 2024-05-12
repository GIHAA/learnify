import mongoose from 'mongoose';
import { autoInc } from 'auto-increment-group';
import mongoosePaginate from 'mongoose-paginate-v2';

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  stripePaymentIntentId: {
    type: String,
    required: true
  },
  completedSections: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  versionKey: '__v',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

enrollmentSchema.plugin(autoInc, {
  field: "sl",
  digits: 4,
  startAt: 1,
  incrementBy: 1,
  unique: false
});

enrollmentSchema.plugin(mongoosePaginate);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;