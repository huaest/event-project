$(function () {
  getUserInfor();
});

function getUserInfor() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // 设置请求头配置对象！！!
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    success: function (res) {
        console.log(localStorage.getItem('token'));
      console.log(res);
    },
  });
}
