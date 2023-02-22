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
let stores = [];
function ListStores()
{
    for(let i=0;i<stores.length;i++)
    {
        if(i%2) {
            AddRightLi(i);
        }
        else{
            AddLeftLi(i);
        }
    }
}

function SearchStore()
{
    let word = document.getElementById("keyWord").value;
    //console.log(word)
    let searchRequest = createXMLHttpRequest();
    searchRequest.onreadystatechange = function() {

        //这个4代表已经发送完毕之后
        if (searchRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (searchRequest.status == 200) {
                //console.log(searchRequest.responseText);
                stores = eval(searchRequest.responseText);
                ListStores();
            } else {
                alert(searchRequest.status+" 无法连接服务器！");
            }
        }
    };

    let url = "http://localhost:8080/SearchStore";
    searchRequest.open("POST", url, true);
    searchRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    searchRequest.send("word="+encodeURI(encodeURI(word))+"&label=-1");
}
function OpenRestaurant(id)
{
    localStorage.setItem('store',id);
    window.open("restaurant.html");
}

function AddLeftLi(i)
{
    let OUL = document.getElementById("grid1");
    let NLI = document.createElement("li");
    NLI.innerHTML = "\n" +
        "                    <figure class=\"effect-oscar\">\n" +
        "                        <img src=\"assets/search/images/home-images/image-4.jpg\" alt=\"\" class=\"img-responsive\"/>\n" +
        "                        <figcaption>\n" +
        "                            <h2><span>" + stores[i].name + "</span></h2>\n" +
        "\n" +
        "                            <p>"+ stores[i].introduction + "</p>\n" +
        "\n" +
        "                            <a href=\"#\" onclick=\"OpenRestaurant(" + stores[i].id+")\"" + ">View more</a>\n" +
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
    NLI.innerHTML ="\n" +
        "                    <figure class=\"effect-oscar\">\n" +
        "\n" +
        "                        <img src=\"assets/search/images/home-images/image-3.jpg\" alt=\"\" class=\"img-responsive\"/>\n" +
        "\n" +
        "                        <figcaption>\n" +
        "\n" +
        "                            <h2><span>" + stores[i].name +"</span></h2>\n" +
        "\n" +
        "                            <p>"+ stores[i].introduction  +"</p>\n" +
        "\n" +
        "                            <a href=\"#\" onclick=\"OpenRestaurant(" + stores[i].id+")\"" + ">View more</a>\n" +
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

