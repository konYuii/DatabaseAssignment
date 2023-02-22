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
    let orderID = document.getElementById("keyWord").value;
    //console.log(word)
    let searchRequest = createXMLHttpRequest();
    searchRequest.onreadystatechange = function() {

        //这个4代表已经发送完毕之后
        if (searchRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (searchRequest.status == 200) {
                //console.log(searchRequest.responseText);
                let s =  searchRequest.responseText.split('&');
                orders = eval(s[0]);
                storeInfo = eval(s[1]);
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
    searchRequest.send("user="+localStorage.getItem('user')+"&type="+localStorage.getItem('type')+"&id="+orderID);
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

    singleOrder[storeInfo[store]] = info;

    localStorage.setItem('singleOrder', JSON.stringify(singleOrder));
}
function OpenOrder(id, index)
{
    localStorage.setItem('orderInfo', JSON.stringify(window.orders[index]));

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

