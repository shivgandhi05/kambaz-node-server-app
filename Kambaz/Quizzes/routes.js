import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
    const dao = QuizzesDao(db);
    
    const findQuizzesForCourse = (req, res) => {
        const { courseId } = req.params;
        const quizzes = dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    };
    
    const createQuizForCourse = (req, res) => {
        const { courseId } = req.params;
        const quizData = { ...req.body, course: courseId };
        const newQuiz = dao.createQuiz(quizData);
        res.send(newQuiz);
    };
    
    const updateQuiz = (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = dao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    };
    
    const deleteQuiz = (req, res) => {
        const { quizId } = req.params;
        const status = dao.deleteQuiz(quizId);
        res.send(status);
    };
    
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
}