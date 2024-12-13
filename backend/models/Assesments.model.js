import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    questions: [{
      question: String,
      options: [String],
      correctAnswer: String
    }],
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    results: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: Number,
      date: Date
    }]
  }, { timestamps: true });
  

  const Assesments = mongoose.model("Assesments",AssessmentSchema)

  export default Assesments