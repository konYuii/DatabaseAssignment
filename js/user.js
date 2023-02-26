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
function UserGet()
{
    TokenGet();
    let xml = createXMLHttpRequest();

    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            //200代表正确收到了返回结果
            if (xml.status == 200) {

                window.user=eval('('+xml.responseText+')');
                localStorage.setItem('user', window.user.id);
                localStorage.setItem('type', '0');
                //console.log(window.user.name);
                console.log(document.getElementById("userMenu").innerHTML);
                document.getElementById("userMenu").innerHTML=window.user.name;

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

function ToSearchPage()
{
    window.open("search.html");
}
function ToOrderPage()
{
    window.open("order.html");
}
function ToInfoPage()
{
    window.open("userInfo.html");
}

let orderAnalysis = [];
let storeAnalysis = [];

function DataAnalysis()
{
    let labels = {};
    for(let i=0;i<storeAnalysis.length;i++)
    {
        if(storeAnalysis[i].label in labels)
        {
            labels[storeAnalysis[i].label] += 1;
        }
        else
        {
            labels[storeAnalysis[i].label] = 1;
        }
    }
    let favor = document.getElementById('favor');
    for(let label in labels)
    {
        if(label == 0)
        {
            let li = document.createElement('li');
            li.innerHTML = "                            <p>炸鸡 <em>"+ Math.round(labels[label]*100.0/storeAnalysis.length)+"%</em></p>\n" +
                "                            <div class=\"progress plain\">\n" +
                "                                <div class=\"bar\" style=\"width: "+ labels[label]*100/storeAnalysis.length +"%;\"></div>\n" +
                "                            </div>";
            favor.append(li);
        }
        else if(label == 1)
        {
            let li = document.createElement('li');
            li.innerHTML = "                            <p>中餐 <em>"+ Math.round(labels[label]*100.0/storeAnalysis.length) +"%</em></p>\n" +
                "                            <div class=\"progress plain\">\n" +
                "                                <div class=\"bar\" style=\"width: "+ labels[label]*100/storeAnalysis.length +"%;\"></div>\n" +
                "                            </div>";
            favor.append(li);
        }
        else if(label == 2)
        {
            let li = document.createElement('li');
            li.innerHTML = "                            <p>火锅冒菜 <em>"+ Math.round(labels[label]*100.0/storeAnalysis.length) +"%</em></p>\n" +
                "                            <div class=\"progress plain\">\n" +
                "                                <div class=\"bar\" style=\"width: "+ labels[label]*100/storeAnalysis.length +"%;\"></div>\n" +
                "                            </div>";
            favor.append(li);
        }
        else if(label == 3)
        {
            let li = document.createElement('li');
            li.innerHTML = "                            <p>烤肉 <em>"+ Math.round(labels[label]*100.0/storeAnalysis.length) +"%</em></p>\n" +
                "                            <div class=\"progress plain\">\n" +
                "                                <div class=\"bar\" style=\"width: "+ labels[label]*100/storeAnalysis.length +"%;\"></div>\n" +
                "                            </div>";
            favor.append(li);
        }
    }
    StoreGet(labels);

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
                storeAnalysis = eval(s[1]);
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

let storeCommand = [];
function StoreCommand(es)
{
    let arr = [];
    for(let id in es)
    {
        let sta = {};
        sta.label = id;
        sta.count = es[id];
        arr.push(sta);
    }
    function cmp(x,y){
        return x.count < y.count?1:-1;
    }
    arr.sort(cmp);
    let cnt = 0;
    for(let i=0;i<storeCommand.length;i++)
    {
        if(cnt==3)
            break;
        if(storeCommand[i].label == arr[cnt].label)
        {
            let div = document.getElementById('command');
            div.innerHTML += "<div class=\"icon\"> <img src=\"assets/main/img/icon-heart.png\" class=\"retina\" alt=\"\" /> </div>\n" +
                "                        <div class=\"text\">\n" +
                "                            <h5>" + storeCommand[i].name +"</h5>\n" +
                "                        </div>\n" +
                "                        <div class=\"divide20\"></div>"

            cnt+=1;
        }
    }
}
function StoreGet(es)
{
    let commandRequest = createXMLHttpRequest();
    commandRequest.onreadystatechange = function() {

        //这个4代表已经发送完毕之后
        if (commandRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (commandRequest.status == 200) {
                storeCommand = eval(commandRequest.responseText);
                StoreCommand(es);
            } else {
                alert(commandRequest.status+" 无法连接服务器！");
            }
        }
    };

    let url = "http://localhost:8080/SearchStore";
    commandRequest.open("POST", url, true);
    commandRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    commandRequest.send("word=&label=-1");
}