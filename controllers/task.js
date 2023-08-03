import { Task } from "../models/task.js";

import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req ,res, next) => {

    try {
        const {title, description} = req.body;

        // use new() => save() - but it takes 2 lines 
        await Task.create({
            title,
            description,
            user: req.user  
        });

        res.status(201).json({
            success: true,
            message: "Task added Successfully"
        })

    } catch (error) {
        next(error)
    }
}

export const getAllTasks = async (req ,res, next) => {

    try {
        const tasks = await Task.find({user: req.user._id})

        res.status(201).json({
            success: true,
            tasks
        })    
    } catch (error) {
        next(error)
    }
}
export const updateTask = async (req ,res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new ErrorHandler("Invalid ID to Update",505));

        task.isCompleted = !task.isCompleted;
        //NOT of the variable

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated."
        })
    } catch (error) {
        next(error)
    }
}
export const deleteTask = async (req ,res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new ErrorHandler("Invalid ID to Delete",404));
    
        await task.deleteOne();
    
        res.status(201).json({
            success: true,
            message: "Task Deleted."
        })
    } catch (error) {
        next(error)
    }
}