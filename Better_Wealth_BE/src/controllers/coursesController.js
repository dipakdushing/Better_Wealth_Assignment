const express = require('express');

const Course= require("../models/coursesModel");

const router= express.Router();


router.post("/", async (req, res) => {

    try {
        
        const courseData= await Course.create(req.body);
        return res.status(201).send(courseData);

    }catch (err) {

        return res.status(500).send(err.message);
    }
});

router.get("/", async (req, res) => {

    try {
        
        const courseData= await Course.find().lean().exec();
        return res.status(200).send(courseData);

    }catch (err) {

        return res.status(500).send(err.message);
    }
});
router.patch("/:id", async (req, res) => {

    try {
        
        const updatedCourse= await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).send(updatedCourse);

    }catch (err) {

        return res.status(500).send(err.message);
    }
});
router.delete("/:id", async (req, res) => {

    try {
        
        const DeletedCourse= await Course.findByIdAndDelete();
        return res.status(200).send(DeletedCourse);

    }catch (err) {

        return res.status(500).send(err.message);
    }
});

router.get("/search/:key", async (req, res) => {

    try {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
        let result= capitalizeFirstLetter(req.params.key);
        
        const searchedCourse= await Course.find(
            {
                "$or": [
                    {"title":{$regex: result}}
                ]
            }
        ).lean().exec();
        return res.status(200).send(searchedCourse);

    }catch (err) {

        return res.status(500).send(err.message);
    }
});

module.exports = router;