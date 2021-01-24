const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>
{
    res.render('index.html');
})

router.get('/schedule',(req,res) =>
{
    res.render('schedule.html', {title: 'Schedule'});
})

module.exports = router;