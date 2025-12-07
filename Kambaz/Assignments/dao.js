export default function AssignmentDao(db) {
    const updateAssignment = (assignmentId, assignmentUpdates) => {
        const assignment = db.assignments.find((a) => a._id === assignmentId);
        if (assignment) {
            Object.assign(assignment, assignmentUpdates);
            return assignment;
        }
        return null;
    };
    const findAssignmentForCourse = (courseId) => {
    return db.assignments.filter((assignment) => assignment.course === courseId);
    };
    const createAssignment = (assignment) => {
        const newAssignment = {...assignment, _id: Date.now().toString()};
        db.assignment.push(newAssignment);
        return newAssignment;
    };
    const deleteAssignment = (assignmentId) => {
        const index = db.assignments.findIndex((a) => a._id === assignmentId);
        if (index !== -1) {
          db.assignments.splice(index, 1);
          return { deleted: true };
        }
        return { deleted: false };
      };
    
      return {
        findAssignmentForCourse,
        createAssignment,
        updateAssignment,
        deleteAssignment,
      };
}