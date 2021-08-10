$(function () {
  $(".loginbox a").click(function () {
    $(".loginbox").hide();
    $(".regbox").show();
  });
  $(".regbox a").click(function () {
    $(".regbox").hide();
    $(".loginbox").show();
  });

  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".regbox [name=pwd]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });

  // 监听注册
  var layer = layui.layer;
  $("#reg").submit(function (e) {
    e.preventDefault();
    $.post(
      "http://api-breakingnews-web.itheima.net/api/reguser",
      {
        username: $("#reg [name=username]").val(),
        password: $("#reg [name=pwd]").val(),
      },
      function (res) {
        layer.msg(res.message);
        if (res.status == 0) $(".links a").click();
      }
    );
  });

  // 监听登入
  $("#login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "http://api-breakingnews-web.itheima.net/api/login",
      // serialize 的缺点，就是在表单内就要设置好对应name的值，否则服务器无法响应
      data: $("#login").serialize(),
      success: function (res) {

        if (res.status == 0) {
          layer.msg("登入成功！");
          // 不要加 '  /  '
          location.href = "index.html";
          // 保存返回的token 于  localStorage中，便于后续的使用
          localStorage.setItem('token',res.token)
        } else {
          layer.msg("登入失败！");
        }
      }
    });
  });
});
