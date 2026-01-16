import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {
    const updateQuiz = (quizId, quizUpdates) => {
        // const quiz = db.quizzes.find((q) => q._id === quizId);
        // if (quiz) {
        //     Object.assign(quiz, quizUpdates);
        //     return quiz;
        // }
        // return null;
        return model.updateOne({_id: quizId}, {$set: quizUpdates});

    };
    
    const findQuizzesForCourse = (courseId) => {
        // return db.quizzes.filter((quiz) => quiz.course === courseId);
        return model.find({course: courseId});
    };
    
    const createQuiz = (quiz) => {
        // const newQuiz = { ...quiz, _id: Date.now().toString() };
        // db.quizzes.push(newQuiz);
        // return newQuiz;
        const newQuiz = {...quiz, _id: uuidv4()};
        return model.create(newQuiz);
    };
    
    const deleteQuiz = (quizId) => {
        // const index = db.quizzes.findIndex((q) => q._id === quizId);
        // if (index !== -1) {
        //     db.quizzes.splice(index, 1);
        //     return { deleted: true };
        // }
        // return { deleted: false };
        return model.deleteOne({ _id: quizId });
    };

    const findQuizById = (quizId) => {
        // const quiz = db.quizzes.find((q) => q._id === quizId);
        // return quiz || null;
        return model.findById(quizId);
    };
    
    return {
        findQuizzesForCourse,
        createQuiz,
        updateQuiz,
        deleteQuiz,
        findQuizById,
    };
}