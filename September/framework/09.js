const express = require('express');


const app = express()

app.get('/index', (req, res) => {
    //获取get请求参数
    res.send(req.query)
});
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');