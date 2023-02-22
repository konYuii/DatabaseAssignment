function createXMLHttpRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
}

function Log() {

  let id=document.getElementById("ID").value;
  let password = document.getElementById("Password").value;
  let type = document.getElementById("Type").value;
  if(id=="" || password=="")
  {
    alert("ID或密码不能为空！");
    return;
  }
  let XMLHttpRequest_test = createXMLHttpRequest();
  //alert("发送");
  //对于返回结果怎么处理的问题
  XMLHttpRequest_test.onreadystatechange = function() {

    //这个4代表已经发送完毕之后
    if (XMLHttpRequest_test.readyState == 4) {
      //200代表正确收到了返回结果
      if (XMLHttpRequest_test.status == 200) {
        localStorage.clear();
        localStorage.setItem('token',XMLHttpRequest_test.responseText);
        if(type == 0)
        {
          window.open("user.html");
        }
        else if(type == 1)
        {
          window.open("store.html");
        }
      } else {
        alert(XMLHttpRequest_test.status+" 无法连接服务器！");
      }
    }
  };

  let url = "http://localhost:8080/LogACK";
  XMLHttpRequest_test.open("POST", url, true);
  XMLHttpRequest_test.setRequestHeader("Content-Type",
    "application/x-www-form-urlencoded");
  XMLHttpRequest_test.send("id="+id+"&password="+password+"&type="+type);
  //window.open("info.html");
}
