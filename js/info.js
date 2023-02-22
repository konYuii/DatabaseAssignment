let info = [];
function createXMLHttpRequest() {
  let XMLHttpRequest_test;
  if (window.XMLHttpRequest) {
    XMLHttpRequest_test = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      XMLHttpRequest_test = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      XMLHttpRequest_test = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return XMLHttpRequest_test;
}

function GetInfo() {
  let XMLHttpRequest_test = createXMLHttpRequest();
  //alert("发送");
  //对于返回结果怎么处理的问题
  XMLHttpRequest_test.onreadystatechange = function() {

    //这个4代表已经发送完毕之后
    if (XMLHttpRequest_test.readyState == 4) {
      //200代表正确收到了返回结果
      if (XMLHttpRequest_test.status == 200) {
          info = jQuery.parseJSON(XMLHttpRequest_test.responseText);
          console.log(XMLHttpRequest_test.responseText);
          WriteInfo();
      } else {
        alert("无法连接服务器！");
      }
    }
  };


  //指明相应页面
  let url = "http://localhost:8080/GetInfo";
  XMLHttpRequest_test.open("POST", url, true);
  //请求头，保证不乱码
  XMLHttpRequest_test.setRequestHeader("Content-Type",
    "application/x-www-form-urlencoded");

  XMLHttpRequest_test.send("token="+localStorage.getItem('token'));
}
function WriteInfo()
{
  document.getElementById('name').value = info.name;
  document.getElementById('Password').value = info.password;
  if(localStorage.getItem('type') == '1')
  {
    document.getElementById('introduction').value = info.introduction;
    document.getElementById('Type').value = info.label;
  }
}
function Change()
{
  let changeRequest = createXMLHttpRequest();
  //alert("发送");
  //对于返回结果怎么处理的问题
  changeRequest.onreadystatechange = function() {

    //这个4代表已经发送完毕之后
    if (changeRequest.readyState == 4) {
      //200代表正确收到了返回结果
      if (changeRequest.status == 200) {
        alert("修改成功!");
      } else {
        alert("无法连接服务器！");
      }
    }
  };


  //指明相应页面
  let url = "http://localhost:8080/ChangeInfo";
  changeRequest.open("POST", url, true);
  //请求头，保证不乱码
  changeRequest.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");

  let name = document.getElementById('name').value;
  let password = document.getElementById('Password').value;
  if(localStorage.getItem('type') == '0')
  {
    changeRequest.send("name="+encodeURI(encodeURI(name))+"&password="+password+"&type="+'0'+"&id="+info.id);
  }
  else
  {
    let introduction = document.getElementById('introduction').value;
    let label = document.getElementById('label').value;
    changeRequest.send("name="+encodeURI(encodeURI(name))+"&password="+password+"&introduction="
        +encodeURI(encodeURI(introduction))+"&label="+label+"&type="+'1'+"&id="+info.id);
  }
}