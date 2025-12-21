export default function QuizzesDao(db) {
    const updateQuiz = (quizId, quizUpdates) => {
        const quiz = db.quizzes.find((q) => q._id === quizId);
        if (quiz) {
            Object.assign(quiz, quizUpdates);
            return quiz;
        }
        return null;
    };
    
    const findQuizzesForCourse = (courseId) => {
        return db.quizzes.filter((quiz) => quiz.course === courseId);
    };
    
    const createQuiz = (quiz) => {
        const newQuiz = { ...quiz, _id: Date.now().toString() };
        db.quizzes.push(newQuiz);
        return newQuiz;
    };
    
    const deleteQuiz = (quizId) => {
        const index = db.quizzes.findIndex((q) => q._id === quizId);
        if (index !== -1) {
            db.quizzes.splice(index, 1);
            return { deleted: true };
        }
        return { deleted: false };
    };
    
    return {
        findQuizzesForCourse,
        createQuiz,
        updateQuiz,
        deleteQuiz,
    };
}