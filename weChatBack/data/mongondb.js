var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//var Promise = require("promise").Promise;
//连接数据库
mongoose.connect('mongodb://_ww:20001206@localhost:27017/test')
mongoose.Promise = global.Promise;
//监听数据库连接状态
mongoose.connection.once('open',()=>{
    console.log('数据库连接成功……')
})
mongoose.connection.once('close',()=>{
    console.log('数据库断开……')
})

//创建Schema对象（约束）
//用户对象
var userSchema = new mongoose.Schema({
    name: String,
    password: Number,
    age:Number,
    gender:{
        type: String,
        default:'男'
    },
    address: String,
    friendList: [],
    url:String,
    intro:String
})
//聊天记里
var recordSchema = new mongoose.Schema({
    name1: String,
    name2: String,
    content: String,
    time: String
})
//群聊
var groupSchema = new mongoose.Schema({
    name:String,
    content:String,
    time:String
})
var userModle = mongoose.model('users',userSchema)
var recordModle = mongoose.model('records',recordSchema)
var groupModle = mongoose.model('group_chats',groupSchema)

exports.userModle = userModle;
exports.recordModle = recordModle;
exports.groupModle = groupModle;