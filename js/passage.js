$(function () {
  getArticle();
  var layerIndex;
  var form = layui.form;

  // 因为是通过动态创建的元素，所以一开始无法绑定事件！！！
  // 添加文章
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    console.log(123);
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status != 0) return console.log("添加文字失败");
        getArticle();
        layer.msg("添加成功");
        // 通过open 的索引 来关闭相应的 layer
        layer.close(layerIndex);
      },
    });
  });

  // 获取文章信息
  function getArticle() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (response) {
        $("#articles").html(template("article", response));
      },
    });
  }
  // 渲染 layer 内容！
  $("#btnShowAdd").click(function (e) {
    // 当不需要模板数据时，直接调用模板的html，这样的好处是可以在页面中不显示模板
    // var html=template('edit');
    layerIndex = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章",
      content: $("#add").html(),
    });
  });

  //填充修改 layer
  $("body").on("click", "#edit_btn", function () {
    layerIndex = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改",
      content: $("#edit").html(),
    });
    $("#hidden_id").val($(this).attr("btn_id"));
    console.log($(this).attr("btn_id"));
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + $(this).attr("btn_id"),
      success: function (response) {
        if (response.status != 0) return console.log("原内容填充失败");
        form.val("lay_edit", response.data);
      },
    });

    //修改文章内容
    $("body").on("submit", "#form-edit", function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: function (response) {
          if (response.status != 0) return console.log("修改失败");
          getArticle();
          layer.msg("修改成功");
          layer.close(layerIndex)
        },
      });
    });
  });

  $("body").on("click", "#delete_btn", function (e) {
    e.preventDefault();
    var deleteid = $(this).attr("btn_id");
    $.ajax({
      type: "GEt",
      url: "/my/article/deletecate/" + deleteid,

      success: function (response) {
        if (response.status != 0) return console.log("删除失败");
        getArticle();
        layer.msg("删除成功！");
      },
    });
  });
});
