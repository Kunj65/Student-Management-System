const express = require("express");

const router = express.Router();

const { checkAuth } = require("../middlewares/auth");

const { checkAuthApi } = require("../middlewares/auth");

const {
    handleGetStudent,
    handleCreateNewStudent,
    handleUpdateStudent,
    handleDeleteStudent,
    handleGetUserById,
    handleFetchStudentWithName,
    handleStudentOrderByAge,
    handlePartialUpdateStudent

} = require("../controllers/studentOperations");


router.get("/handleGetStudent/",checkAuthApi,handleGetStudent);
router.post("/handleCreateNewStudent",checkAuthApi,handleCreateNewStudent);
router.patch("/handleUpdateStudent/:id",checkAuthApi,handleUpdateStudent);
router.delete("/handleDeleteStudent/:id",checkAuthApi,handleDeleteStudent);
router.get("/handleGetStudentById/:id",checkAuthApi,handleGetUserById);
router.get("/handleFetchStudentWithName/:first_name",checkAuthApi,handleFetchStudentWithName);
router.get("/handleStudentOrderByAge",checkAuthApi,handleStudentOrderByAge);
router.patch("/handlePartialUpdateStudent/:id",checkAuthApi,handlePartialUpdateStudent)


module.exports = router;
