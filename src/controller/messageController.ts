import express from 'express'
import Message from '../model/message'
import User from '../model/userModel'
import { Request, Response } from "express";


// Define the interface for the user token
interface AuthenticatedRequest extends Request {
  user?: any;
}

export  const getUserForSideBar = async(req:AuthenticatedRequest, res:Response) =>{

    try {
        const userId = req.user._id

        const filteredUser = await User.find({_id : {$ne:userId}}).select("-password")

        //count the number of message
        const unseenMessage:Record<string,number> = {}
        const promises = filteredUser.map(async(user)=>{
            const messages = await Message.find({senderId:user._id, receiverId:userId, seen:false})

            if(messages.length > 0) {
                unseenMessage[user._id.toString()] = messages.length;
            }
        })
            await Promise.all(promises)

         res.status(200).json({
                success:true,
                users:filteredUser, unseenMessage
            })


    } catch (error) {
    res.status(500).json({
            success: false,
            message:`Internal server error: ${error.message}`
        })
    }
}



//get all messages for selected User

export const getMessages = async(req:AuthenticatedRequest, res:Response)=>{
    try {
        const {selectedUserId} = req.params;
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:selectedUserId},
                {senderId:selectedUserId, receiverId:myId}
            ]

        })
        await Message.updateMany({senderId:selectedUserId, receiverId:myId}, {seen:true});

        res.status(200).json({success:true, messages})
    } catch (error) {
        res.status(500).json({success:false})
        console.log(error.message)       
    }
}


//to mark message as seen

export const markMessageAsSeen = async(req:AuthenticatedRequest, res:Response)=>{
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen:true})
        res.status(200).json({success:true})
    } catch (error) {
        res.status(500).json({success:false})
    }
}