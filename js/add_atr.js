$(function () {
  var form = layui.form;
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (response) {
      if (response.status != 0) return console.log("获取分类列表失败");
      var htmlstr = template("kind_show", response);
      $("#art_select").html(htmlstr);
      //   layui 重写渲染！
      form.render();
    },
  });

  $("#pub").click(function (e) {
    e.preventDefault();
    $("[name=state]").val("已发布");
    var formdata = new FormData($("#public_art")[0]);
    $.ajax({
      type: "POST",
      url: "/my/article/add",
      data: formdata,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.status != 0) return console.log("发布失败");
        console.log(response);
      },
    });
  });
});
