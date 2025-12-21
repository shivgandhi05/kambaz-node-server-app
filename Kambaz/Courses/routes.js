import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";


export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };

  const createCourse = (req, res) => {
    console.log("Create course called");
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    console.log("New course created:", newCourse);
    console.log("Enrolling current user:", currentUser);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };
  
  const updateCourse = (req, res) => {
    console.log("Update course called");
    const { courseId } = req.params;
    const courseUpdates = req.body;

    if (!courseUpdates) {
      return res.status(400).json({ message: "No updates provided" });
    }

    const status = dao.updateCourse(courseId, courseUpdates);
    if (!status) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.send(status);
  };




  

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/courses", createCourse);  
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  
  
  
}
