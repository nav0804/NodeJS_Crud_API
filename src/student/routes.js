const {Router} = require("express");
const controller = require("./controller")

const routes = Router();
routes.get("/allStudents", controller.getStudents);
routes.post("/newStudent",controller.createStudent)
routes.get("/:id",controller.getStudentById)
routes.delete("/:id",controller.removeStudent)
routes.put("/:id",controller.updateStudent)

module.exports = routes;
