var userInfo = {
  "name":"",
  "password":"",
  "gender":"",
  "age":0,
  "address":"",
  "intro":""
}
var friends = {
  list: document.querySelector('ul.people'),
  all: document.querySelectorAll('.left .person'),
  name: ''
},

  chat = {
    container: document.querySelector('.container #dialogue'),
    current: null,
    person: null,
    name: document.querySelector('.container #dialogue .top .name')
  };

/*
 * 点击头像事件
 */

 $(".profile").click(function () {
  friends = {
    list: document.querySelector('ul.people'),
    all: document.querySelectorAll('.left .person'),
    name: ''
  };  
  chat = {
    container: document.querySelector('.container #dialogue'),
    current: null,
    person: null,
    name: document.querySelector('.container #dialogue .top .name')
  };
  $("#dialogue").hide();
  $("#info").css("display","block")
  
});
/*
 *重置个人信息
 */
$(":button[value='重置']").click(function(){
  $("form").children().not(".button").val("")
}
)

/*
 * 提交个人信息
 */
$(":button[value='提交']").click(function(){
  userInfo.name=$("[name='name']").val()
  userInfo.password=$("[name='password']").val()
  userInfo.gender=$("[name='gender']").val()
  userInfo.address=$("[name='address']").val()
  userInfo.intro=$("[name='intro']").val()
  userInfo.age=$("[name='age']").val()  
  $.post("http://localhost:9001/user/update",userInfo).then(()=>{
      alert("提交成功");
      location.reload();
      
  })
}
) 
/* document.querySelector('.chat[data-chat=person2]').classList.add('active-chat');
document.querySelector('.person[data-chat=person2]').classList.add('active'); */

//friends.all.forEach(function (f) {
   $('li.person').on("click", function () {
    console.log("别点啦")
    $("#info").css("display","none")
    $("#dialogue").show();
    f.classList.contains('active') || setAciveChat(f);
  }); 
//});
/* $("li.person").click(function(){
  alert("ww");
}) */

function setAciveChat(f) {
  f.addClass('active');
  $('.person').removeClass('active');
  chat.current = $('.active-chat');
  chat.person = f.attr('data-chat');
  chat.current.removeClass('active-chat');
  chat.container.find('[data-chat="' + chat.person + '"]').addClass('active-chat');
  friends.name = f.find('.name').text();
  $(".top").find(".name").text(friends.name);
  chat.name.innerHTML = friends.name;
}

