const express = require('express');

const home = express.Router();

home.get('/index', (req, res) => {
    res.send('欢迎来到博客首页')
});
module.exports = home;
