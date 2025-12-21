import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentForCourse(courseId);
    res.json(assignments);
  };

  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    const newAssignment = dao.createAssignment(assignment);
    res.send(newAssignment);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  };

  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
}