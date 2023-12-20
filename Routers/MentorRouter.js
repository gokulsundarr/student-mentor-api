const express = require('express');
const  mongoose  = require('mongoose');
const Mentor = require('../Models/MentorModel');

const mentorRouter = express.Router();

mentorRouter.get('/', async (req,res) => {
    try{
        const mentors = await Mentor.find();
        res.send(mentors);
    }catch(err){
        res.status(400).send(err);
    }
    
})

mentorRouter.post('/',async (req,res) => {
    const {name,email,course} = req.body;
    const addMentor = new Mentor({
        "name" : name,
        "email" : email,
        "course" : course
    })
    try{
        const newMentor = await addMentor.save();
        res.send(newMentor)
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

mentorRouter.get('/get-mentor/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const mentor = await Mentor.findById({_id : id})
        res.status(200).send(mentor);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

module.exports = mentorRouter;