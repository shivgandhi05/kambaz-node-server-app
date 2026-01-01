import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";


export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      console.log("Current user from session:", currentUser)
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    console.log("Finding courses for userId:", userId);
    console.log("All enrollments:", db.enrollments);
    console.log("All courses:", db.courses);
    
    
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    console.log("Courses found for user:", courses);
    res.json(courses);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };

  const createCourse = async (req, res) => {
    console.log("Create course called");
    const currentUser = req.session["currentUser"];
    const newCourse = await dao.createCourse(req.body);
    console.log("New course created:", newCourse);
    console.log("Enrolling current user:", currentUser);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };
  
  const updateCourse = async (req, res) => {
    console.log("Update course called");
    const { courseId } = req.params;
    const courseUpdates = req.body;

    // if (!courseUpdates) {
    //   return res.status(400).json({ message: "No updates provided" });
    // }

    const status = await dao.updateCourse(courseId, courseUpdates);
    // if (!status) {
    //   return res.status(404).json({ message: "Course not found" });
    // }
    res.send(status);
  };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if ( uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, rs) => {
    let { uid, cid} =req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };



  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/courses", createCourse);  
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  
  
}
