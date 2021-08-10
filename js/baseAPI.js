$.ajaxPrefilter(function (options) {
  // 因为每一次ajax请求都会先调用这一个接口，所以在这直接修改域名
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  // 給需要 Authorization的請求添加 header配置

  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  // 防止未登入就访问主页面+每次只要访问失败就回调，打包写法
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "login.html";
    }
  };
});
