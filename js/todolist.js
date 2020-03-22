$(function () {
  // 1 按下回车 把数据 存储到本地 里面
  $("#title").on("keydown", function (e) {
    if (e.keyCode === 13) {
      if ($(this).val() === "") {
        alert("请输入内容");
      } else {
        //读取本地 存储的数据
        var local = getDate();
        // 把local 数组进行更新 把最新的数据 追加到 local 后面
        local.push({ title: $(this).val(), done: false });
        // 把这个数组local 存到本地储存
        savaDate(local);
        load();
        $(this).val("");
      }
    }
  });
  //删除模块
  $("ol,ul").on("click", "a", function () {
    //获取本地数据
    var data = getDate();
    //修改数据
    var index = $(this).attr("id");
    // 保存到本地
    // 从第几个开始删 删多少个
    data.splice(index, 1);
    savaDate(data);
    // 重新渲染
    load();
  });
  //正在进行 和 已经完成
  $("ol,ul").on("click", "input", function () {
    //获取本地数据
    var data = getDate();
    //修改数据
    var index = $(this).siblings("a").attr("id");
    data[index].done = $(this).prop("checked");


    // 保存到本地
    savaDate(data);
    // 重新渲染
    load();
  })
//双击修改
  $("ol,ul").on("click", "p", function () {
    var str = this.innerHTML;
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    // alert(11);
    this.innerHTML = '<input type="text" />';
    var input = this.children[0];
    input.value = str;
    input.select(); // 文本框里面的文字处于选定状态
    // 当我们离开文本框就把文本框里面的值给span 
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    };
    // 按下回车也可以把文本框里面的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        // 手动调用表单失去焦点事件  不需要鼠标离开操作
        this.blur();
      }
    }
  })
  //读取本地存储的数据
  function getDate() {
    var data = localStorage.getItem("todolist");
    if (data != null) {
      //不为空 就返还
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  //保存本地数据
  function savaDate(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }
  //渲染加载数据
  function load() {
    //读取本地存储的数据
    var data = getDate();
    // 遍历清空 ol 里面元素的内容
    $("ol,ul").empty();
    var todoCount = 0;//正在完成的个数
    var doneCount = 0;//已经完成的个数
    // 遍历这个数据
    $.each(data, function (i, n) {
      if (n.done) {
        // i为索引号，n为数据
        $("ul").prepend("<li ><input type='checkbox' checked='checked'><p>" + n.title + "</p><a id=" + i + " href='javascript:''></a></li>");
        doneCount++;
      } else {
        // i为索引号，n为数据
        $("ol").prepend("<li ><input type='checkbox'><p>" + n.title + "</p><a id=" + i + " href='javascript:''></a></li>");

        todoCount++;
      }
    });
    $("#todocount").text(todoCount);
    $("#donecount").text(doneCount);
  }
});
