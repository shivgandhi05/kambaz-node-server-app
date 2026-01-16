import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
    const dao = QuizzesDao(db);
    
    const findQuizzesForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    };
    
    const createQuizForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quizData = { ...req.body, course: courseId };
        const newQuiz = await dao.createQuiz(quizData);
        res.send(newQuiz);
    };
    
    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    };
    
    const deleteQuiz = async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.send(status);
    };

    const findQuizById = async (req, res) =>  {
        const {quizId} = req.params;
        const quiz = await dao.findQuizById(quizId);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    };
    
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
    app.get("/api/quizzes/:quizId", findQuizById);
}