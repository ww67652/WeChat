/*
 Navicat Premium Data Transfer

 Source Server         : ww_mongo
 Source Server Type    : MongoDB
 Source Server Version : 50005
 Source Host           : 101.43.31.168:27017
 Source Schema         : test

 Target Server Type    : MongoDB
 Target Server Version : 50005
 File Encoding         : 65001

 Date: 20/12/2021 08:31:48
*/


// ----------------------------
// Collection structure for group_chats
// ----------------------------
db.getCollection("group_chats").drop();
db.createCollection("group_chats");

// ----------------------------
// Documents of group_chats
// ----------------------------
db.getCollection("group_chats").insert([ {
    _id: ObjectId("61bfcca7b16600007b00325a"),
    name: "ww",
    content: "我是ww",
    time: "2021/12/8 下午4:46:13"
} ]);
db.getCollection("group_chats").insert([ {
    _id: ObjectId("61bfccb4b16600007b00325b"),
    name: "dog",
    content: "我是dog",
    time: "2021/12/8 下午4:46:15"
} ]);

// ----------------------------
// Collection structure for records
// ----------------------------
db.getCollection("records").drop();
db.createCollection("records");

// ----------------------------
// Documents of records
// ----------------------------
db.getCollection("records").insert([ {
    _id: ObjectId("61b070c81c4f000036001f76"),
    name1: "ww",
    name2: "dog",
    content: "hi，我是ww",
    time: " 2021/12/8 下午4:46:13"
} ]);
db.getCollection("records").insert([ {
    _id: ObjectId("61b070d7a0088fe136833944"),
    name1: "dog",
    content: "hi，我是dog",
    time: "2021/12/8 下午4:46:14",
    __v: NumberInt("0"),
    name2: "ww"
} ]);
db.getCollection("records").insert([ {
    _id: ObjectId("61be9c746d4500004a0038b2"),
    name1: "dog",
    content: "dog",
    time: "2021/12/18 下午4:46:14",
    __v: NumberInt("0"),
    name2: "ww"
} ]);
db.getCollection("records").insert([ {
    _id: ObjectId("61beb2ec2b427b7a6a66c082"),
    name1: "ww",
    name2: "tom",
    content: "hi，我是ww",
    time: "2021/12/19 下午12:19:56",
    __v: NumberInt("0")
} ]);
db.getCollection("records").insert([ {
    _id: ObjectId("61beb44c2b427b7a6a66c0e6"),
    name1: "ww",
    name2: "tom",
    content: "ww",
    time: "2021/12/19 下午12:25:48",
    __v: NumberInt("0")
} ]);
db.getCollection("records").insert([ {
    _id: ObjectId("61bf310450f1a10e6211f32b"),
    name1: "ww",
    name2: "dog",
    content: "ww",
    time: "2021/12/19 下午9:17:57",
    __v: NumberInt("0")
} ]);
db.getCollection("records").insert([ {
    _id: ObjectId("61bf335050f1a10e6211f349"),
    name1: "ww",
    name2: "dog",
    content: "测试",
    time: "2021/12/19 下午9:27:44",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("61af366e1c4f000036001f72"),
    name: "ww",
    password: NumberInt("123"),
    age: NumberInt("20"),
    gender: "男",
    address: "赛博坦星球",
    friendList: [
        "dog",
        "tom",
        "ee",
        "dog"
    ],
    url: "./img/白熊.png",
    intro: "我是ww"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("61af36ac1c4f000036001f73"),
    name: "dog",
    password: 123,
    age: 20,
    gender: "男",
    friendList: [
        "ww",
        "tom"
    ],
    url: "img/dog.png",
    intro: "我是dog"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("61b06d643a0ac3338e927332"),
    name: "tom",
    password: NumberInt("123"),
    gender: "男",
    friendList: [
        "ww",
        "dog"
    ],
    url: "img/tom.png"
} ]);
