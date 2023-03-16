let orders = [];
let storeInfo = [];
let foodInfo = [];
let foodOrder = [];

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
function ListOrders()
{
    document.getElementById('grid1').innerHTML='';
    document.getElementById('grid2').innerHTML='';
    for(let i=0;i<orders.length;i++)
    {
        if(i%2) {
            AddRightLi(i);
        }
        else{
            AddLeftLi(i);
        }
    }
}

function SearchOrders()
{
    let time = document.getElementById("time").value;
    //console.log(word)
    let searchRequest = createXMLHttpRequest();
    searchRequest.onreadystatechange = function() {

        if (searchRequest.readyState == 4) {
            if (searchRequest.status == 200) {
                //console.log(searchRequest.responseText);
                let s =  searchRequest.responseText.split('&');
                orders = eval(s[0]);
                storeInfo = eval(s[1]);
                console.log(orders);
                ListOrders();
            } else {
                alert(searchRequest.status+" 无法连接服务器！");
            }
        }
    };
    let url = "http://localhost:8080/GetOrders";
    searchRequest.open("POST", url, true);
    searchRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");

    if(time == '')
    {
        searchRequest.send("user="+localStorage.getItem('user')+"&type="+localStorage.getItem('type')
            + "&all=1");
    }
    else
    {
        let s = time.split(' ');
        let start = s[0];
        let end = s[2];
        console.log(end);

        searchRequest.send("user="+localStorage.getItem('user')+"&type="+localStorage.getItem('type')
            +"&all=0" +"&startTime="+Date.parse(start)+"&endTime="+Date.parse(end));
    }

}

function WriteData(store)
{
    let singleOrder = {};
    let info = [];

    for(let i=0;i<foodInfo.length;i++)
    {
        let food = {};
        food['name'] = foodInfo[i].name;
        food['price'] = foodInfo[i].price;
        food['count'] = foodOrder[i].count;

        info.push(food);
    }

    singleOrder[storeInfo[store].name] = info;

    localStorage.setItem('singleOrder', JSON.stringify(singleOrder));
}
function OpenOrder(id, index)
{
    localStorage.setItem('orderInfo', JSON.stringify(orders[index]));

    let orderRequest = createXMLHttpRequest();
    orderRequest.onreadystatechange = function (){
        //这个4代表已经发送完毕之后
        if (orderRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (orderRequest.status == 200) {
                let s = orderRequest.responseText.split('&');
                //console.log(s[0]);
               // console.log(s[1]);
                foodInfo = eval(s[0]);
                foodOrder = eval(s[1]);
                WriteData(index);
                window.open('singleOrder.html');
            } else {
                alert(orderRequest.status+" 无法连接服务器！");
            }
        }
    }

    let url = "http://localhost:8080/GetFoods";
    orderRequest.open("POST", url, true);
    orderRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    orderRequest.send("id="+id);
}

function AddLeftLi(i)
{
    let OUL = document.getElementById("grid1");
    let NLI = document.createElement("li");
    let status = "已完成";
    if(orders[i].status == 0)
        status = "已下单";
    else if(orders[i].status == 1)
        status = "已接单";
    NLI.innerHTML = "\n" +
        "                    <figure class=\"effect-oscar\">\n" +
        "                        <img src=\"assets/search/images/home-images/image-4.jpg\" alt=\"\" class=\"img-responsive\"/>\n" +
        "                        <figcaption>\n" +
        "                            <h2><span>" + status + "</span></h2>\n" +
        "\n" +
        "                            <p>"+ storeInfo[i].name + "</p>\n" +
        "\n" +
        "                            <a href=\"#\" onclick=\"OpenOrder(" + orders[i].id+","+ i +")\"" + ">View more</a>\n" +
        "                        </figcaption>\n" +
        "                    </figure>\n" +
        "\n";
    OUL.append(NLI);

    new AnimOnScroll(OUL, {

        minDuration : 0.4,

        maxDuration : 0.7,

        viewportFactor : 0.2

    });
}
function AddRightLi(i)
{
    let OUL = document.getElementById("grid2");
    let NLI = document.createElement("li");
    let status = "已完成";
    if(orders[i].status == 0)
        status = "已下单";
    else if(orders[i].status == 1)
        status = "已接单";
    NLI.innerHTML ="\n" +
        "                    <figure class=\"effect-oscar\">\n" +
        "\n" +
        "                        <img src=\"assets/search/images/home-images/image-3.jpg\" alt=\"\" class=\"img-responsive\"/>\n" +
        "\n" +
        "                        <figcaption>\n" +
        "\n" +
        "                            <h2><span>" + status + "</span></h2>\n" +
        "\n" +
        "                            <p>"+ storeInfo[i].name + "</p>\n" +
        "\n" +
        "                            <a href=\"#\" onclick=\"OpenOrder(" + orders[i].id+","+ i +")\"" + ">View more</a>\n" +
        "\n" +
        "                        </figcaption>\n" +
        "\n" +
        "                    </figure>\n";
    OUL.append(NLI);
    new AnimOnScroll(OUL, {

        minDuration : 0.4,

        maxDuration : 0.7,

        viewportFactor : 0.2

    });
}

function HandleDate(time)
{
    time = time ? time : null;
    let date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    // let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    // let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    // let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D;
}
function exportCsv(obj){
    let title = obj.title;
    let titleForKey = ['id','user','money','status'];
    let data = obj.data;
    let str = [];
    str.push(obj.title.join(",")+"\n");
    for(let i=0;i<data.length;i++){
        let temp = [];
        for(let j=0;j<titleForKey.length;j++){
            temp.push(data[i][titleForKey[j]]);
        }
        temp.push(HandleDate(data[i].time));
        str.push(temp.join(",")+"\n");
    }
    let blob = new Blob(['\uFEFF' + str.join('')], {
        type: 'text/plain;charset=utf-8',
    });
    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "orders.csv";
    downloadLink.click();
}

function ExportOrder(){
    let da = {};
    da.title = ['编号','用户','金额','状态','时间'];
    da.data = orders;
    exportCsv(da);
}

