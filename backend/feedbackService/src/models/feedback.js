const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true
    },
    added_by: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    sentiment_analysis: {
      type: String
    },
    is_analysed: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
