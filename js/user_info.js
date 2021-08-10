$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return "用户昵称必须在1~6个字符之间!";
      }
    },
  });
  getUserInfo();

  function getUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status === 1) {
          return layer.msg(res.message);
        }
        //快速填充表单，前面一个是lay-filter的字符串，第二个是填充的数据与input中的name相对应！
        form.val("formUserInfo", res.data);
      },
    });
  }
  upgradeInfo();
  // 提交表单，更新用户数据
  function upgradeInfo() {
    $(".layui-form").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
          if (res.status != 0) return console.log("更新用户信息失败");
          else {
            layer.open({
              content: "修改成功！",
            });
            // 调用父页面更新信息方法
            window.parent.getUserInfo(); //window是当前iframe
          }
        },
      });
    });
  }

  //   重置数据
  $("#reset").click(function (e) {
    e.preventDefault();
    getUserInfo();
  });

});

// 必须在立即执行函数里面才可以互通数据！
