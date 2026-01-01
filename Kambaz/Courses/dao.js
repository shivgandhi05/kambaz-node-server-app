
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao(db) {
  function findAllCourses() {
    return model.find({},{ name: 1, description: 1 });
  };

  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
    // db.courses = [...db.courses, newCourse];
    // return newCourse;
  };

  function deleteCourse(courseId) {
    // const { enrollments } = db;
    // db.courses = courses.filter((course) => course._id !== courseId);
    // db.enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);
    // return { status: "OK" };
    return model.deleteOne({ _id: courseId });
  };

  async function findCoursesForEnrolledUser(userId) {
    const { enrollments } = db;

    const courses = await model.find({},{ name: 1, description: 1 });
    console.log("DAO - Looking for userId:", userId);
    console.log("DAO - Enrollments:", enrollments);
    
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => {
        const enrollmentUserId = typeof enrollment.user === 'object'
        ? enrollment.user._id
        : enrollment.user;
        return enrollmentUserId === userId && enrollment.course === course._id;
      })
    );
    return enrolledCourses;
  };

   function updateCourse(courseId, courseUpdates) {
    
    // const { courses } = db;
    // const course = courses.find((course) => course._id === courseId);
    // if (!course) {
    //   return null;
    // }
    // Object.assign(course, courseUpdates);
    // return course;
    return model.updateOne({ _id: courseId}, {$set: courseUpdates});
  };

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse};
  
}