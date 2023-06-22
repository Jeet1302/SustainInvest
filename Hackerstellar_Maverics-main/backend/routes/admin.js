const express = require("express")
const Notes = require("../models/Notes")
const fetchuser = require("../middlewares/fetchUser");
const { fetchAdminRole } = require("../middlewares/fetchRole");
const router = express.Router()

router.get('/allusernotes', [fetchuser, fetchAdminRole], async(req, res)=>{
    const notes = await Notes.find();
    res.send(notes);
});

module.exports = router;