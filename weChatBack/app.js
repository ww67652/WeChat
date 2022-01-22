const express = require('express')
const app = express()
const mongodb = require("./data/mongondb");

//引入对象数据模型
const userModle = mongodb.userModle;
const recordModle = mongodb.recordModle;
const groupModle = mongodb.groupModle;
//设置端口号
const port = 9001;


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: true });
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: ['http://localhost:5501'],
  methods: ['GET', 'POST', 'PUT', "DELETE"],
  alloweHeaders: ['Conten-Type', 'Authorization']
}));
//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})
//设置用户列表，便于向指定用户发送信息
var userList = {}
io.on("connection", socket => {
  socket.on("disconnected", () => {
    console.log("user disconnected")
  })

  //用户加入聊天
  socket.on('join', (username) => {
    userList[username] = socket.id
    console.log(username + "成功连接")
  })
  //接收消息
  socket.on('send', (msg, callback) => {
    console.log("服务端接收信息，来自：" + msg.name1)
    callback(true);
    //向接受用户发送信息(若该用户已经上线)
    if (userList[msg.name2]) {
      console.log("服务端发送信息，送往：" + msg.name2)
      socket.to(userList[msg.name2]).emit('forward', msg)
    }
    console.log("msg:" + msg)
  })
  socket.on('toGroup', (msg, callback) => {
    console.log("服务端接收群聊信息，来自：" + msg.name)
    callback(true);
    socket.emit('fromGroup', msg)
  })
})
/**
 * 注册
 */
app.post('/user', (req, res) => {
  //检查用户名是否已存在
  userModle.findOne({ name: req.body.name }, (err, doc) => {
    if (err) {
      console.log("err:" + err)
      res.send(err)
    }
    else if (doc == null) {
      var newUser = new userModle({
        name: req.body.name,
        password: req.body.password,
        url: "img/白熊.png"
      })
      newUser.save(function (err) {    // 执行保存，并查看返回情况
        var result = err ? 'failed' : 'success';
        res.send(result)
      })
    }
    else res.send("用户名已存在")
  })

}
)
/**
 * 登录
 */
app.get('/user/:name/pw/:password', (req, res) => {
  userModle.findOne({ name: req.params.name }, (err, doc) => {
    if (err) {
      console.log("err:" + err)
      res.send(err)
    }
    else if (doc == null) { res.send("undefined name") }
    else if (doc.password != req.params.password) { res.send("wrong password") }
    else res.send("success")
  }
  )
}
)
/**
 * 根据用户名称获取用户信息
 */
app.get('/user/:name', (req, res) => {
  userModle.findOne({ name: req.params.name }, (err, doc) => {
    if (err) {
      console.log("err:" + err)
      res.send(err)
    }
    res.json(doc)
  }
  )
}
)
/**
 * 获取所有用户信息
 */
app.get('/user', (req, res) => {
  userModle.find((err, doc) => {
    if (err) {
      console.log("err:" + err)
      res.send(err)
    }
    res.send(doc)
  }
  )
})

/**
 * 根据用户名称修改用户信息
 */
app.post('/user/update', (req, res) => {
  console.log("服务端：" + req.body.name)
  userModle.updateMany({ name: req.body.name }, {
    $set: {
      name: req.body.name, password: req.body.password, age: req.body.age,
      gender: req.body.gender, address: req.body.address
    }
  }, (err, doc) => {
    if (err) {
      console.log("err:" + err)
      res.send(err)
    }
    res.send(doc)
  }
  )
}
)
/**
 * 新增聊天记录
 */
app.post('/record', (req, res) => {
  // var myDate = new Date();
  var chatRecord = new recordModle({
    name1: req.body.name1,
    name2: req.body.name2,
    content: req.body.content,
    time: req.body.time
  })
  chatRecord.save(function (err) {    // 执行保存，并查看返回情况
    var result = err ? 'failed' : 'success';
    res.send(result)
  })
}
)
/**
 * 撤回聊天记录
 */
 app.post('/record/delete', (req, res) => {
  // var myDate = new Date();
  console.log("撤回"+req.body.name1)
  recordModle.findOneAndDelete({
    name1: req.body.name1,
    name2: req.body.name2,
    content: req.body.content,
    time: req.body.time
  },(err,doc)=>{
      if(doc){
        res.send("success");
        return;
      }
      res.send("err");
      return;
  })
}
)
/**
 * 获取两个用户之间的聊天记录
 */
app.get('/record/:name1/:name2', (req, res) => {
  recordModle.find({ name1: { $in: [req.params.name1, req.params.name2] }, name2: { $in: [req.params.name1, req.params.name2] } }, (err, doc) => {
    if (err) {
      console.log('err:' + err);
      res.send('error');
    }
    res.send(doc);
  })
}
)
/**
 * 添加好友
 */
app.post('/friend', (req, res) => {
  
  userModle.findOne({ name: req.body.friendName }, (err, doc) => {
    if (err) {
      console.log("err:" + err)
      res.send('err')
      return;
    }
    else if (doc == null) {res.send("none");return;}
    else {
      userModle.findOne({name:req.body.userName},(err, doc) => {
        if (err) {
          console.log("err:" + err)
          res.send('err')
          return;
        }
        var _friendList = []
        _friendList = doc.friendList;
        if(_friendList.indexOf(req.body.friendName)>-1){
          res.send("already")
          return;
        }

        _friendList.push(req.body.friendName);
        userModle.findOneAndUpdate({ name: req.body.userName }, { friendList: _friendList }, (err) => {
          if (!err) res.send("success")
          return;
        })
      }
      )

    }
  }
  )
})
/**
 * 删除好友
 */

 app.post('/user/delete', (req, res) => {
  
    userModle.findOne({name:req.body.userName},(err, doc) => {
      if (err) {
        console.log("err:" + err)
        res.send('err')
        return;
        }
        if(!doc.friendList)return;
        var _friendList = []
        _friendList = doc.friendList;
        if(_friendList.indexOf(req.body.friendName)==-1){
          res.send("none")
          return;
        }
        _friendList.splice(_friendList.findIndex(e => e === req.body.friendName), 1)
        userModle.findOneAndUpdate({ name: req.body.userName }, { friendList: _friendList }, (err) => {
          if (!err){ 
            console.log("删除后："+_friendList)
            res.send("success")
          return;}
        })
      }
      )
})
/**
 * 获取群聊记录
 */
app.get("/group",(req,res)=>{
  groupModle.find((err,doc)=>{
      res.send(doc);
      return;
    })
})
/**
 * 新增群聊记录
 */
 app.post("/group",(req,res)=>{
  var group_chat = new groupModle({
    name: req.body.name,
    content: req.body.content,
    time: req.body.time
  })
  group_chat.save(function (err) {    // 执行保存，并查看返回情况
    var result = err ? 'failed' : 'success';
    res.send(result)
  })
})
server.listen(port, () => console.log(`Server running on port ${port}`));









