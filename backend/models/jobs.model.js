import { mongoose } from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    requirements: [String],
    skills: [String],
    company: { name: String, logoUrl: String },
    location: String,
    salary: { min: Number, max: Number },
    jobType: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: true });

  const Jobs = mongoose.model("Jobs",jobSchema)

  export default Jobs