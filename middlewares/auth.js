import {User} from '../models/user.js'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try { //not in video
        const {token} = req.cookies;

        if(!token) {
            return res.status(404).json({
                success: false,
                message: "Kindly Log In first.",
            })
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        next(error)
    }
}

//5:10