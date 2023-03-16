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

function RegisterUser()
{
    let name = document.getElementById('name').value;
    let password = document.getElementById('Password').value;
    let password2 = document.getElementById('Password2').value;
    if(password != password2)
    {
        alert("两次密码不一致！");
    }
    else
    {
        let registerRequest = createXMLHttpRequest();

        registerRequest.onreadystatechange = function() {

            //这个4代表已经发送完毕之后
            if (registerRequest.readyState == 4) {
                //200代表正确收到了返回结果
                if (registerRequest.status == 200) {
                    alert("注册成功，ID为："+ id);
                } else {
                    alert(registerRequest.status+" 无法连接服务器！");
                }
            }
        };

        let url = "http://localhost:8080/Register";
        registerRequest.open("POST", url, true);
        registerRequest.setRequestHeader("Content-Type",
            "application/x-www-form-urlencoded");
        registerRequest.send("name="+encodeURI(encodeURI(name))+"&password="+password+"&type="+'0');
    }

}
function RegisterStore()
{
    let name = document.getElementById('name').value;
    let introduction = document.getElementById('introduction').value;
    let password = document.getElementById('Password').value;
    let password2 = document.getElementById('Password2').value;
    let label = document.getElementById('Type').value;
    if(password != password2)
    {
        alert("两次密码不一致！");
    }
    else
    {
        let registerRequest = createXMLHttpRequest();

        registerRequest.onreadystatechange = function() {

            //这个4代表已经发送完毕之后
            if (registerRequest.readyState == 4) {
                //200代表正确收到了返回结果
                if (registerRequest.status == 200) {
                    let id = registerRequest.responseText;
                    alert("注册成功，ID为："+ id);
                } else {
                    alert(registerRequest.status+" 无法连接服务器！");
                }
            }
        };

        let url = "http://localhost:8080/Register";
        registerRequest.open("POST", url, true);
        registerRequest.setRequestHeader("Content-Type",
            "application/x-www-form-urlencoded");
        registerRequest.send("name="+encodeURI(encodeURI(name))+"&password="+password+"&introduction="+encodeURI(encodeURI(introduction))+"&label="+label+"&type="+'1');
    }
}

function selectImg(source) {
    var file = source.files[0];
    if(window.FileReader) {
        var fr = new FileReader();
        fr.onloadend = function(e) {
            // 通过img属性src设置显示区
            document.getElementById("img").src = e.target.result;
            // img 作为传输到服务器的参数
        };

        fr.readAsDataURL(file);
    }
}