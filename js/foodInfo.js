
let foods = [];
function PutInfoInTable()
{
  var str = '';
  for (var i = 0; i < foods.length; i++) {

    str += '<tr>';
    str += '<td>'+ (i+1) +'</td>';
    str += '<td><input value='+foods[i].name+'></td>';
    str += '<td><input value='+foods[i].price+'></td>';
    str += '</tr>';
  }
  //console.log(str);
  document.getElementById("container").innerHTML = str;
}

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

function FoodGet() {
  let foodRequest = createXMLHttpRequest();
  let id = localStorage.getItem('user');
  //alert("发送");
  //对于返回结果怎么处理的问题
  foodRequest.onreadystatechange = function() {

    //这个4代表已经发送完毕之后
    if (foodRequest.readyState == 4) {
      //200代表正确收到了返回结果
      if (foodRequest.status == 200) {
        foods = eval(foodRequest.responseText);
        PutInfoInTable();
      } else {
        //如果不能正常接受结果，你肯定是断网，或者我的服务器关掉了。
        alert("网络连接中断！");
      }
    }
  };


  //指明相应页面
  let url = "http://localhost:8080/GetStoreFoods";
  foodRequest.open("POST", url, true);
  //请求头，保证不乱码
  foodRequest.setRequestHeader("Content-Type",
    "application/x-www-form-urlencoded");

  foodRequest.send("id="+id);

}

function ModifyFoods()
{
  let trs = document.getElementById('container').children;
  let modifies = [];
  let newFoods = [];
  for(let i=0;i<trs.length;i++)
  {
    let index = parseInt(trs[i].children[0].innerText) - 1;
    let name = trs[i].children[1].children[0].value;
    let price = parseFloat(trs[i].children[2].children[0].value);
    if(index >= foods.length)
    {
      let newInfo = {};
      newInfo.name = name;
      newInfo.price = price;
      newFoods.push(JSON.stringify(newInfo));
    }
    else if(foods[index].name != name || foods[index].price != price)
    {
      let newInfo = {};
      newInfo.id = foods[index].id;
      newInfo.name = name;
      newInfo.price = price;
      modifies.push(JSON.stringify(newInfo));
    }
  }

  if(modifies.length > 0 || newFoods.length > 0)
    SendModifies(modifies, newFoods);
}

function SendModifies(modifies, newFoods)
{
  let modifyRequest = createXMLHttpRequest();
  let id = localStorage.getItem('user');
  //alert("发送");
  //对于返回结果怎么处理的问题
  modifyRequest.onreadystatechange = function() {

    //这个4代表已经发送完毕之后
    if (modifyRequest.readyState == 4) {
      //200代表正确收到了返回结果
      if (modifyRequest.status == 200) {
        alert("修改成功!");
      } else {
        //如果不能正常接受结果，你肯定是断网，或者我的服务器关掉了。
        alert("网络连接中断！");
      }
    }
  };


  //指明相应页面
  let url = "http://localhost:8080/ModifyStoreFoods";
  modifyRequest.open("POST", url, true);
  //请求头，保证不乱码
  modifyRequest.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");

  modifyRequest.send("id="+id+"&info="+encodeURI(encodeURI(modifies.toString()))+"&news="+encodeURI(encodeURI(newFoods.toString())));
}

function AddFoods()
{
  let trs = document.getElementById('container').children;
  let str = '';
  str += '<tr>';
  str += '<td>'+ (trs.length + 1) +'</td>';
  str += '<td><input></td>';
  str += '<td><input></td>';
  str += '</tr>';

  let con = document.getElementById("container");
  con.innerHTML += str;
}
