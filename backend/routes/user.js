const express = require("express");
const { checkAuthApi } = require("../middlewares/auth");
const router = express.Router();

const {

    handleUserSignup,

    handleUserLogin,

    handleLogout,

    handleCheckAuth,

} = require("../controllers/user");


// SIGNUP

router.post("/signup", handleUserSignup);


// LOGIN

router.post("/login", handleUserLogin);


// LOGOUT

router.post("/logout", handleLogout);

router.get("/check-auth", checkAuthApi, handleCheckAuth);


module.exports = router;