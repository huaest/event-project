$(function () {
  var form = layui.form;
  var laypage=layui.laypage
  var data = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };
  //   更新 分类 下拉栏
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (response) {
      if (response.status != 0) return console.log("请求失败");
      var htmlstr = template("select_list", response);
      $("[name=cate_id]").html(htmlstr);
      // layui事件没有被监听到，使用 form 中的 render 时期重新渲染 ui
      form.render();
    },
  });
  // 获取文章数据
  getArtList(data);

  function getArtList(data) {
    $.ajax({
      type: "GET",
      url: "/my/article/list",
      data: data,
      success: function (response) {
        if (response.status != 0) return console.log("获取文章列表失败");
        var html = template("ari_list", response);
        $("#artdata").html(html);
        // 渲染分页
        renderpage(response.total);
      },
    });
  }

  //   监听选项栏变换
  $("#select_art").submit(function () {
    data.state = $("[name=state]").val();
    data.cate_id = $("[name=cate_id]").val();
    getArtList(data);
  });

  //   渲染分页
  function renderpage(total) {
      laypage.render({
        //   容器 id 不加 #
          elem:'page-box',
        //   总共几条
          count:total,
        //   一页几条
          limit:data.pagesize,
        //   默认选中第几页
        curr:data.pagenum
      })
  }
});
