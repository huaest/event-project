$(function () {
  // 获取用户信息
  getUserInfor();

  // 退出模快
  var layer = layui.layer; // 必須要通過layui來獲取！
  $(".logout").click(function () {
    console.log(123);
    layer.confirm("is not?", { icon: 3, title: "提示" }, function (index) {
      // 删除本地的token记录
      localStorage.removeItem("token");

      // 回退到登入页面
      location.href = "login.html";

      layer.close(index);
    });
  });
});

function getUserInfor() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // 设置请求头配置对象！！!
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    success: function (res) {
      // 这里必须写上，因为后面可能会报undefined，因为没有获取数据！
      if(res.status==1){
        return console.log("请求失败！");
      }
      //get head image
      getHead(res.data);
    },

  });
}

//get head image

function getHead(user) {
  // 渲染 name
  var name = user.nickname || user.username; //  简便写法，因为 || 本身有优先级！
  $(".user-name").html("欢迎，" + name);
  //  渲染头像
  var picture = user.user_pic;
  if (picture !== null) {
    $(".non-head").hide();
    $(".user-img").attr("src", picture).show();
  } else {
    $(".user-img").hide();
    $(".non-head").html(name[0].toUpperCase()).show();
  }
}
