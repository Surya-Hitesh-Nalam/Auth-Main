import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    issueDate: { type: Date, default: Date.now },
    badgeUrl: String
  }, { timestamps: true });

const Certification = mongoose.model("Certification",certificationSchema)

export default Certification