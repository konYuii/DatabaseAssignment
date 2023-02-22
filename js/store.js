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
function TokenGet()
{
    window.token = localStorage.getItem('token');
}
function StoreGet()
{
    TokenGet();
    let xml = createXMLHttpRequest();

    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            //200代表正确收到了返回结果
            if (xml.status == 200) {

                window.store=eval('('+xml.responseText+')');
                localStorage.setItem('user', window.store.id);
                localStorage.setItem('type', '1');
                //console.log(window.user.name);
                document.getElementById("userMenu").innerHTML=window.store.name;
                DataGet();
            } else {
                alert(xml.status+" 无法连接服务器！");
            }
        }
    };

    let url = "http://localhost:8080/GetInfo";
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    xml.send("token="+window.token);
}
function ToOrderPage()
{
    window.open("order.html");
}
function ToFoodsPage()
{
    window.open("foodInfo.html");
}
function ToInfoPage()
{
    window.open("storeInfo.html");
}
let orderAnalysis = [];
let foodAnalysis = [];
let foodInfo = [];

function DataAnalysis() {
    let foods = {};
    for (let i = 0; i < foodAnalysis.length; i++) {
        if (foodAnalysis[i].food in foods) {
            foods[foodAnalysis[i].food] += foodAnalysis[i].count;
        }
        else {
            foods[foodAnalysis[i].food] = foodAnalysis[i].count;
        }
    }
    let arr = [];
    for (let id in foods)
    {
        let sta = {};
        sta.id = id;
        sta.count = foods[id];
        arr.push(sta);
    }
    function cmp(x,y){
        return x.count < y.count ? 1:-1;
    }
    arr.sort(cmp);
    let favor = document.getElementById('favor');
    for(let i=0;i<(arr.length<3?arr.length:3);i++)
    {
        let food = {};
        for(let j=0;j<foodInfo.length;j++)
        {
            //console.log(arr[i]);
            if(foodInfo[j].id == arr[i].id)
            {
                food = foodInfo[j];
                break;
            }
        }
        let li = document.createElement('li');
        li.innerHTML = "                            <p>"+food.name +"<em>"+ arr[i].count +"</em></p>\n" +
            "                            <div class=\"progress plain\">\n" +
            "                                <div class=\"bar\" style=\"width: "+ arr[i].count*50.0/arr.length +"%;\"></div>\n" +
            "                            </div>";
        favor.append(li);
    }


    //console.log(orderAnalysis);
    let tmp = Date.parse( new Date().toString() ).toString();
    tmp = parseInt(tmp);
    let moneyES = {};
    for(let j=0;j<7;j++)
    {
        let maxT = tmp - j * 60*60*24*1000;
        let minT = tmp - (j+1)*60*60*24*1000;
        moneyES[maxT] = 0.0;
        for(let i=0;i<orderAnalysis.length;i++)
        {
            let order = orderAnalysis[i];
            //console.log(order.time);
            if(order.time >= minT && order.time <= maxT)
            {
                moneyES[maxT] += order.money;
            }
        }
    }
    return moneyES;

}
function DataGet()
{
    let orderRequest = createXMLHttpRequest();
    orderRequest.onreadystatechange = function() {

        //这个4代表已经发送完毕之后
        if (orderRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (orderRequest.status == 200) {
                //console.log(searchRequest.responseText);
                let s =  orderRequest.responseText.split('&');
                orderAnalysis = eval(s[0]);
                foodAnalysis = eval(s[2]);
                foodInfo = eval(s[3]);
                let data = DataAnalysis();
                EDisplay(data);
            } else {
                alert(orderRequest.status+" 无法连接服务器！");
            }
        }
    };

    let url = "http://localhost:8080/GetOrders";
    orderRequest.open("POST", url, true);
    orderRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    orderRequest.send("user="+localStorage.getItem('user')+"&type="+localStorage.getItem('type'));
}