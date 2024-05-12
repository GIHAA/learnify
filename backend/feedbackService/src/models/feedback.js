const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0,
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
    sentiment_analysis_score: {
      type: Number
    },
    is_positive: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
