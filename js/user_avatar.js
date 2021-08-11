$(function () {
  // 点击选择图片
  $("#btnChooseImg").on("click", function () {
    $("#file").click();
  });

  let file = null;
  // 选中了图片
  $("#file").on("change", function (e) {
    const files = e.target.files;
    if (files.length === 0) {
      return (file = null);
    }

    file = files[0];
    url = URL.createObjectURL(file);
    $("#image").attr("src", url);
  });

  // 点击了上传头像的按钮
  $("#btnUploadImg").on("click", function () {
    if (!file) {
      return layer.msg("请先选择头像！");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
   $.ajax({
       type: "POST",
       url: "/my/update/avatar",
       data: {
        avatar:reader.result
       },
       success: function (response) {
           console.log(reader.result);
       }
   });
  });
});
