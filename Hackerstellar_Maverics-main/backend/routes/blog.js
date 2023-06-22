const express = require("express")
const fetchuser = require("../middlewares/fetchUser");
const Blogs = require('../models/Blog');
const User = require('../models/User');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).send(blogs);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
});

router.post('/createblog/:userid', fetchuser, async (req, res) => {
    try {
        const userId = req.params['userid'];
        const nameObj = await User.findById(userId).select('name -_id');
        const blog = { title: req.body.title, content: req.body.content, name: nameObj.name, creator: userId };
        console.log(blog);
        newblog = await Blogs.create(blog);
        res.status(201).json(newblog);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/:blogid', async(req, res)=>{
    try{
        const blog = await Blogs.findById(req.params['blogid']);
        res.status(200).send(blog);
    } catch(err){
        res.status(400).send({message: err.message});
    }
});


module.exports = router;
