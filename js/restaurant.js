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
let store = '0';
let restaurant = [];
let foods = [];
function Init(){
    store = localStorage.getItem('store');
    if(localStorage.getItem('cart') == null)
    {
        let json = {};
        localStorage.setItem('cart',JSON.stringify(json));
    }

    setInterval(FreshCart, 1000);
    GetInfo();
}
function GetInfo(){
    let infoRequest = createXMLHttpRequest();
    //alert("发送");
    //对于返回结果怎么处理的问题
    infoRequest.onreadystatechange = function() {

        //这个4代表已经发送完毕之后
        if (infoRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (infoRequest.status == 200) {
                let s = infoRequest.responseText.split("&");
                //console.log(s[0]);
                restaurant = jQuery.parseJSON(s[0]);
                foods = eval(s[1]);
                WriteInfo();
            } else {
                //alert(infoRequest.status+" 无法连接服务器！");
            }
        }
    };

    let url = "http://localhost:8080/GetRestaurant";
    infoRequest.open("POST", url, true);
    infoRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    infoRequest.send("id="+store);
}
function WriteInfo(){
    document.getElementById("restaurantName").innerHTML = restaurant.name;
    document.getElementById("restaurantIntro").innerHTML = restaurant.introduction;
    localStorage.setItem('restaurant', restaurant.name);
    for(let i=0;i<foods.length;i++)
    {
        AddFoodLi(i);
    }
}

function AddFoodLi(i){
    let OUL = document.getElementById("foodsBoard");
    let NLI = document.createElement("li");

    NLI.innerHTML = "                                <li class=\"wow fadeInUp\" data-wow-duration=\"300ms\" data-wow-delay=\"300ms\">\n" +
        "                                    <div class=\"item\">\n" +
        "                                        <div class=\"item-title\">\n" +
        "                                            <h2>" + foods[i].name +"</h2>\n" +
        "                                            <div class=\"border-bottom\"></div>\n" +
        "                                            <span>￥ " + foods[i].price +"</span>\n" +
        "                                            <span class=\"cartAdd\" style='cursor: default' onclick='AddGoodcar("+ i +")'> + </span>" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </li>";

    OUL.append(NLI);

}

function AddGoodcar(i){
    let food = {};
    food.name = foods[i].name;
    food.price = foods[i].price;
    food.id = foods[i].id;
    food.store = parseInt(store);

    let cart = jQuery.parseJSON(localStorage.getItem('cart'));
    let name = restaurant.name;
    if(!(restaurant.name in cart)){
        let json = [];
        json.push(food);
        cart[name] = json;
        localStorage.setItem('cart', JSON.stringify(cart));
        let cnt = document.getElementById('goodCnt');
        cnt.innerHTML = (parseInt(cnt.innerHTML) + 1) + '';
    }
    else{
        let json = eval(cart[name]);
        let have = false;
        for(let i=0;i<json.length;i++)
        {
            if(json[i].id == food.id)
            {
                have=true;
                break;
            }
        }
        if(!have)
        {
            json.push(food);
            cart[name] = json;
            localStorage.setItem('cart', JSON.stringify(cart));

            let cnt = document.getElementById('goodCnt');
            cnt.innerHTML = (parseInt(cnt.innerHTML) + 1) + '';
        }

    }
}

function FreshCart()
{
    let cart = jQuery.parseJSON(localStorage.getItem('cart'));
    let store = Object.keys(cart);
    let cnt = 0;
    for(let i=0;i<store.length;i++)
    {
        cnt += cart[store[i]].length;
    }

    document.getElementById('goodCnt').innerHTML = cnt + '';
}
