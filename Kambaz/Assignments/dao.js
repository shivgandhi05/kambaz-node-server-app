import { v4 as uuidv4 } from "uuid";

export default function AssignmentDao(db) {

  function findAssignmentForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((assignment) => assignment.course === courseId);
  };

  function createAssignment(assignment) {
    const newAssignment = {...assignment, _id: uuidv4()};
    db.assignment = [...db.assignments, newAssignment];
    return newAssignment;
};
    function updateAssignment(assignmentId, assignmentUpdates) {
       const { assignments } = db;
       db.assignments = assignments.map((assignment) => assignment._id === assignmentId ? {...assignment, ...assignmentUpdates} : assignment);
        return db.assignments.find((assignment) => assignment._id === assignmentId);
    };
    
   
    function deleteAssignment(assignmentId) {
       const { assignments } = db;
        db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
        return { status: "OK" };
      };

      function findAssignmentById(assignmentId) {
        const { assignments } = db;
        return assignments.find((assignment) => assignment._id === assignmentId);
      };

    
      return {
        findAssignmentForCourse,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        findAssignmentById,
      };
}