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
    document.getElementById('label').value = info.label;
    document.getElementById('img').src = 'http://localhost:8080/'+info.image;
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
        window.location.reload();
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
    MKDir();
    let introduction = document.getElementById('introduction').value;
    let label = document.getElementById('label').value;
    //changeRequest.send(form);
    changeRequest.send("name="+encodeURI(encodeURI(name))+"&password="+password+"&introduction="
        +encodeURI(encodeURI(introduction))+"&label="+label+"&type="+'1'+"&id="+info.id);
  }
}

function selectImg(source) {
  var file = source.files[0];
  if(window.FileReader) {
    var fr = new FileReader();
    fr.onloadend = function(e) {
      document.getElementById("img").src = e.target.result;
    };

    fr.readAsDataURL(file);
  }
}
function MKDir()
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      SendImg();
    }
  };
  xhr.open("GET", "http://localhost:8080/UploadFile?store="+localStorage.getItem("user"));
  xhr.send();
}

function ChangePath(path)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/UpdatePath");
  xhr.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");
  xhr.send("type=store"+"&path="+encodeURI(encodeURI(path))+"&id="+info.id);
}
function SendImg(i)
{
  let input = document.getElementById('file');
  if(input.files[0])
  {
    var formData = new FormData();
    let file = new File([input.files[0]], info.id+'_'+input.files[0].name);
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let path = xhr.responseText;
        ChangePath(path);
      }
    };
    xhr.open("POST", "http://localhost:8080/UploadFile");
    xhr.send(formData);
  }
}