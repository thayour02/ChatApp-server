import  express  from "express";

import { Register,Login,UpdateProfile, checkAuth } from "../controller/userController";
import { authenticationMiddleware } from "../middleware/auth";


export default (router:express.Router)=>{
    router.post('/register',  Register)
    router.post('/login', Login)
    router.put('/update-profile',authenticationMiddleware, UpdateProfile)
    router.get('/check',authenticationMiddleware, checkAuth)

}