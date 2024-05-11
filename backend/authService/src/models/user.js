import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { autoInc } from 'auto-increment-group';

const UserSchema = new mongoose.Schema({
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
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  is_verified: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  photo_url: String
}, {
  versionKey: '__v',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.plugin(autoInc, {
  field: "sl",
  digits: 4,
  startAt: 1,
  incrementBy: 1,
  unique: false
});
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', UserSchema);


export default User;
