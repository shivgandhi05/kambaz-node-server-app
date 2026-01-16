import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema(
    {
        _id: String,
        title: String, 
        description: String, 
        course: String,
        points: Number,
        dueDate: Date,
        availableFrom: Date,
        availableUntil: Date,
        quizType: {
            type: String, 
            enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
            default: "GRADED_QUIZ",
        },
        assignmentGroup: {
            type: String, 
            enum: ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"],
            default: "QUIZZES",
        },
        shuffleAnswers: Boolean,
        timeLimitMinutes: Number,
        multipleAttemptsAllowed: Boolean,
        numberOfAttemptsAllowed: Number,
        showCorrectAnswers: {
            type: String,
            enum: ["IMMEDIATELY", "AFTER_DUE_DATE", "NEVER"],
            default: "AFTER_DUE_DATE",
        },
        accessCode: String,
        oneQuestionAtATime: Boolean,
        webCamRequired: Boolean,
        lockQuestionsAfterAnswering: Boolean,
    },
    { collection: "quizzes" }
);
export default quizzesSchema;