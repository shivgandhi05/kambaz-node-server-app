import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentDao() {

  function findAssignmentForCourse(courseId) {
    return model.find({course: courseId});
  };

  function createAssignment(assignment) {
    const newAssignment = {...assignment, _id: uuidv4()};
    return model.create(newAssignment);
};
    function updateAssignment(assignmentId, assignmentUpdates) {
      return model.updateOne({ _id: assignmentId}, {$set: assignmentUpdates});
    };
    
   
    function deleteAssignment(assignmentId) {
      return model.deleteOne({ _id: assignmentId });
    };

      function findAssignmentById(assignmentId) {
        return model.findById(assignmentId);
      };

    
      return {
        findAssignmentForCourse,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        findAssignmentById,
      };
}