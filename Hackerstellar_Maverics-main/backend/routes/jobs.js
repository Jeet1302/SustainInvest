const list = require('./joblist');
const express = require('express');
const Jobs = require('../models/Jobs');
const router = express.Router();

router.post('/addjob', async(req, res)=>{
    const jobs = req.body;
    try{
        for(let job of jobs){
            await Jobs.create(job);
        }
        res.status(200).send('done')
    } catch(err){
        console.log(err.message);
    }
});

router.get('/getjobs', async(req, res)=>{
    try{
        const jobs = await Jobs.find();
        res.status(200).send(jobs);
    } catch(err){
        console.log(err.message);
    }
});

module.exports = router;
