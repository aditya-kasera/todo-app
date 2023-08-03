import express from "express";
import { 
    getAllUsers, 
    register, 
    getMyProfile,
    login,
    logout
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

//dynamic route to be at the last

// router.get("/userid/:id", getUserDetails);
// router.route("/userid/:id")
// .get(getUserDetails);

export default router;
//3:41