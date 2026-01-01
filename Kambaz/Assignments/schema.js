import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
    _id: String,
    title: String, 
    course: String,
    description: String,
    points: Number, 
    dueDate: Date,
    availableFrom: Date, 
    availableUntil: Date, 
    assignmentGroup: {
        type: String,
        enum: ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"],
        default: "ASSIGNMENTS",
    },
    displayGradeAs: {
        type: String, 
        enum: ["PERCENTAGE", "POINTS", "LETTER"],
    },
    submissionType: {
        type: String,
        enum: ["ONLINE", "PAPER", "NO_SUBMISSION"],
        default: "ONLINE",
    },
    onlineEntryOptions: {
        textEntry: Boolean,
        websiteUrl: Boolean,
        mediaRecordings: Boolean,
        studentAnnotations: Boolean,
        fileUploads: Boolean,
    },
    assignTo: String,
    published: Boolean,

    },
    { collection: "assignments" }
);
export default assignmentSchema;