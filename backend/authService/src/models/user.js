import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ['ADMIN', 'LEARNER','INSTRUCTOR'],
      default: 'LEARNER'
    },
    enrolledCourses: {
      type: String,
      default: false
    },
  
    
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

UserSchema.plugin(aggregatePaginate);

UserSchema.index({ createdAt: 1 });

const User = mongoose.model('User', UserSchema);

User.syncIndexes();

export default User;
