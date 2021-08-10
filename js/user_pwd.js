$(function () {
  var form = layui.form;
  form.verify({
    //   检查密码规范
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 检查两次面一致
    repwd: function (val) {
      var pwd = $("#new_pwd").val();
      if (pwd != val) return "两次密码不一致！";
    },
  });

  //   修改密码
  changePwd();
  // 提交无反应的原因，data错误且不会报错！，注意要 key 接口一一对应
  function changePwd() {
    $(".layui-form").submit(function (e) {
      e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/my/updatepwd",
        data: $(".layui-form").serialize(),
        success: function (res) {
          if (res.status != 0) {
            return layui.layer.msg(res.message);
          } else {
              layui.layer.msg("更新成功")
            //   这一句不允许标签内的 name 或者 id 是 reset！！！--->转换成 dom 元素使用 reset ！
              $(".layui-form")[0].reset();
          }
        },
      });
    });
  }
});
