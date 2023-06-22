const express = require("express")
const Notes = require("../models/Notes")
const fetchuser = require("../middlewares/fetchUser");
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const router = express.Router()

// getting all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    let notes;
    if(req.user.role === "admin") notes = await Notes.find();
    else notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})

// add a new notes
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       const ext = file.mimetype.split("/")[1];
//       cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//     },
// });
// const upload = multer({ storage: multerStorage });

// router.post("/addnote", fetchuser, [
//     upload.single('myimage')
// ], async (req, res) => {
//     try {

//         // checking validation and errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { title, description, tag } = req.body;
//         const file = req.file;
//         console.log(file);
//         newnote = await Notes.create({
//             user: req.user.id,
//             title,
//             description,
//             tag,
//             imgpath: file ? file.path:null
//         })
//         res.json(newnote)
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })

// update an existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const {title, description, tag, } = req.body;
        // create a new note object
        newnote = {};
        if(title) newnote.title = title
        if(description) newnote.description = description
        if(tag) newnote.tag = tag
    
        // checking is this same user who entered notes
        const n = await Notes.findById(req.params.id)
        if(!n) return res.status(404).send("Not found")
        if(n.user.toString() !== req.user.id && req.user.role !== "admin") return res.send(401).send("Unauthorized")
    
        // find the note to be updated and update it
        const note = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new: true})
        res.json(note);
    } catch (error) {
        res.status(500).send("Error has occured" + error);
    }
})

// deleting an existing note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // checking is this same user who entered notes
        const n = await Notes.findById(req.params.id)
        if(!n) return res.status(404).send("Not found..!!")
        if(n.user.toString() !== req.user.id && req.user.role !== "admin") return res.send(401).send("Unauthorized")
        // find the note to be updated and update it
        const note = await Notes.findByIdAndDelete(req.params.id);
        res.send("Note has been deleted");
    } catch (error) {
        res.status(500).send("Error has occured" + error);
    }
})

module.exports = router