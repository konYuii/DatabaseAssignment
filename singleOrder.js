var $cartContainer = $('<div class="mzContainer">\
                            <div class= "check-container" >\
                                <div class="shop-cart-nav">\
                                    <table>\
                                        <tr>\
                                            <td class="check-area">\
                                                <a href="javascript:;" class="check-label check-all">\
                                                </a>\
                                            </td>\
                                            <td class="singal-price">\
                                                单价(元)\
                                            </td>\
                                            <td class="volumes">\
                                                数量\
                                            </td>\
                                            <td class="small-total">\
                                                小计(元)\
                                            </td>\
                                            <td class="edit-area">\
                                            </td>\
                                        </tr>\
                                    </table>\
                                </div>\
                                <ul class="goods-ul">\
                                </ul>\
                            </div >\
                            <div class="shop-cart-footer">\
                                <div class="cart-foot clearfix">\
                                    <div class="cart-foot-right">\
                                        <em class="total-bill">\
                                            合计(不含运费)：\
                                        <span class="bill-price"></span>\
                                        </em>\
                                        <a href="javascript:;" class="order-btn ban-order" id="operate">去结算</a>\
                                    </div>\
                                </div>\
                            </div>\
                        </div >');

$(".header").after($cartContainer);

var datas = jQuery.parseJSON(localStorage.getItem('singleOrder'));
$.each(datas, function (i, e) {
    var newTr = '';
    var $newLi = $('<li class="goods-list">\
                        <table class= "goods-header" >\
                            <tr>\
                                <td colspan="5">\
                                    <a href="javascript:;" class="check-label check-local-part">\
                                        <em class="check-name">' + i + '</em>\
                                    </a>\
                                </td>\
                            </tr>\
                        </table >\
                        <table class="goods-body">\
                        </table>\
                    </li>');

    $(e).each(function (i, e) {
        newTr += '<tr>\
                        <td class="goods-col-select">\
                            <a href="javascript:;" class="goods-info">\
                                <h4 class="goods-info-title" name="good-name">'+ e.name + '</h4>\
                            </a>\
                        </td>\
                        <td class="goods-col-price">\
                            <span>'+ e.price + '</span>\
                        </td>\
                        <td class="goods-col-volumes">\
                            <div class="num-ctrl-area clearfix">\
                                <input type="text" value=' + e.count +' class="input" readonly="true">\
                            </div>\
                        </td>\
                        <td class="goods-col-total">\
                            <span></span>\
                        </td>\
                        <td class="goods-col-ctrl">\
                            <span>- -</span>\
                            <i class="del-product">\
                                <span class="line-left"></span>\
                                <span class="line-right"></span>\
                            </i>\
                        </td>\
                    </tr>';
    });

    $newLi.children("table.goods-body").append(newTr);
    $newLi.appendTo($("ul.goods-ul"));

});


(function (win, undefined) {
    var ShopCart = function () {
        this.judge = '';
        this.curUnitBtn = null;
        this.fixedObj();
        this.dynamic1Obj();
        this.calcInfo();
        this.singalDel();
        this.globalDel();

        this.orderBtnCss();
        this.twoBtn();
        this.floatDelBtn();
        this.checkBox();
        this.inputChange();
        this.fixed();
        this.init();
    };
    ShopCart.prototype = {
        constructor: ShopCart,
        init: function () {
            var shopCart = this;

            this.input.each(function (i, e) {
                var $thisButton = $(e).parent().find(shopCart.button);
                shopCart.buttonCss($thisButton, $(e).val());
            });

            this.editBtn.parent().on("click", function () {

                shopCart.editBtn.toggleClass(shopCart.edit);
                if (shopCart.editBtn.hasClass(shopCart.edit)) {
                    shopCart.editBtn.text("编辑");
                    shopCart.delCtrl.show().siblings().fadeOut(100);
                } else {
                    shopCart.editBtn.text("完成");
                    shopCart.delCtrl.hide().siblings().fadeIn(100);
                };
            });
            this.cancelBtn.on("click", function () {
                shopCart.floatBox.fadeOut(200);
            });
            this.closeBtn.on("click", function () {
                shopCart.floatBox.fadeOut(200);
            });
            this.orderBtn.on("click", function () {
                let localOrder = jQuery.parseJSON(localStorage.getItem('orderInfo'));
               if(localOrder.status == 0 && parseInt(localStorage.getItem('type')) == 1)
               {
                   console.log(1)
                   ChangeOrderStatus(1);
               }
                if(localOrder.status == 1 && parseInt(localStorage.getItem('type')) == 0)
                {
                    ChangeOrderStatus(2);
                }
            });

            $(window).on("resize scroll", function () {
                shopCart.fixed();
            });
        },

        fixedObj: function () {
            this.mzContainer = $(".mzContainer");
            this.cartFoot = this.mzContainer.find("div.shop-cart-footer");
            this.checkAll = this.mzContainer.find("a.check-all");//全选按钮
            this.sum = this.mzContainer.find("span.sum");//总件数
            this.sumed = this.mzContainer.find("span.sum-selected");//已选总件数
            this.billPrice = this.mzContainer.find("span.bill-price");//合计价格
            this.orderBtn = this.mzContainer.find("a.order-btn");//结算按钮
            this.editBtn = this.mzContainer.find("td.edit-area>span.edit");//编辑按钮
            this.delSelected = this.mzContainer.find("em.goods-delete");//删除选中商品按钮
            this.floatBox = $(".float-box");
            this.delBtn = this.floatBox.find("a.delete");
            this.cancelBtn = this.floatBox.find("a.cancel");
            this.closeBtn = this.floatBox.find("i.close-btn");
            this.confirmTitle = this.floatBox.find("h4.confirm-title>span");
            this.confirmCon = this.floatBox.find("div.confirm-content");
            //class样式
            this.checked = 'checked';
            this.forbid = 'forbid';
            this.fixSite = 'fixed';
            this.banOrder = 'banOrder';
            this.edit = 'edit';
        },
        dynamic1Obj: function () {
            this.checkLabelAll = $("a.check-label");
            this.checkContainer = $(".check-container");
            this.cartNav = this.checkContainer.children(".shop-cart-nav");
            this.goodsList = this.checkContainer.find("li.goods-list");
            this.goodsHeader = this.goodsList.children("table.goods-header");
            this.goodsBody = this.goodsList.children("table.goods-body");
            this.checkLocalPart = this.goodsHeader.find("a.check-local-part");//某个品类的头部按钮
            this.goodsTr = this.goodsBody.find("tr");//商品卡片
            this.checkProduct = this.goodsBody.find("a.check-product");//单个商品勾选按钮
            this.button = this.goodsBody.find("button");
            this.plus = this.goodsBody.find(".plus");//加号按钮
            this.minus = this.goodsBody.find(".minus");//减号按钮
            this.input = this.goodsBody.find(".input");//输入框
            this.singalPrice = this.goodsBody.find("td.goods-col-price>span");//单价
            this.smallTotal = this.goodsBody.find("td.goods-col-total>span");//小计
            this.delCtrl = this.goodsBody.find("td.goods-col-ctrl>span");//小计后面的编辑区
            this.delProduct = this.goodsBody.find("i.del-product");
        },

        dynamic2Obj: function () {
            this.checkLocalPartEd = $("a.check-local-part.checked");//某个品类中已经选中的全选按钮
            this.checkProductEd = $("a.check-product.checked");//单个商品中已经选中的勾选按钮
        },
        calcInfo: function () {
            var shopCart = this;
            this.dynamic2Obj();
            var sum = 0,
                sumed = 0,
                total = 0;
            this.goodsTr.each(function (i, e) {
                var $e = $(e),
                    numVal = parseInt($e.find(shopCart.input).val()),//输入框值
                    unitPrice = parseFloat($e.find(shopCart.singalPrice).text()),//单价
                    $smalltotalTxt = $e.find(shopCart.smallTotal);//小计
                sum += numVal;//计算总件数
                $smalltotalTxt.text("￥" + (numVal * unitPrice).toFixed(2));//计算小计价格
                total+=numVal*unitPrice;
            });
            this.checkProduct.closest(shopCart.goodsTr).each(function (i, e) {
                var $e = $(e),
                    numVal = parseInt($e.find(shopCart.input).val()),
                    unitPrice = parseFloat($e.find(shopCart.singalPrice).text());//单价
                sumed += numVal;//已选总件数
                total += unitPrice * numVal;//计算总价价格
            });
            this.sum.text(sum);
            this.sumed.text(sumed);
            this.billPrice.text('￥' + total.toFixed(2));
        },
        buttonCss: function (button, value) {
            var shopCart = this;
            button.each(function () {
                $(this).removeClass(shopCart.forbid);
            });
            if (value == 1) {
                button.eq(0).addClass(shopCart.forbid);
            };
            if (value == 10) {
                button.eq(1).addClass(shopCart.forbid);
            };
        },
        twoBtn: function () {
            var shopCart = this;
            shopCart.plus.on("click", function () {
                var $this = $(this);
                var value = parseInt($this.prev().val());
                value++;
                if (value > 10) {
                    return;
                };
                shopCart.buttonCss($this.parent().find(shopCart.button), value);
                $this.prev().val(value);
                shopCart.calcInfo();
            });

            shopCart.minus.on("click", function () {
                var $this = $(this);
                var value = parseInt($this.next().val());
                value--;
                if (value < 1) {
                    return;
                };
                shopCart.buttonCss($this.parent().find(shopCart.button), value);
                $this.next().val(value);
                shopCart.calcInfo();
            });
        },
        inputChange: function () {
            var shopCart = this;
            this.input.on("change", function () {
                var $this = $(this),
                    $thisVal = parseInt($this.val());
                if ($thisVal > 10) {
                    $this.val(10);
                } else if ($thisVal < 1 || isNaN($thisVal)) {
                    $this.val(1);
                } else {
                    $this.val($thisVal);
                };
                shopCart.calcInfo();
                console.log($this.parent().find(shopCart.button))
                shopCart.buttonCss($this.parent().find(shopCart.button), parseInt($this.val()));
            });
        },
        //结算按钮样式变化
        orderBtnCss: function () {
            if (parseInt(this.sumed.text()) != 0) {
                this.orderBtn.removeClass(this.banOrder);
            } else {
                this.orderBtn.addClass(this.banOrder);
            };
        },
        //删除选中商品的点击事件
        globalDel: function () {
            var shopCart = this;
            this.delSelected.on("click", function () {
                shopCart.judge = "global";
                shopCart.floatBox.fadeIn(200);
                if (shopCart.checkProductEd.length != 0) {
                    shopCart.confirmTitle.text("删除");
                    shopCart.confirmCon.text("您确定要删除选中商品吗？");
                    shopCart.delBtn.show();
                    shopCart.cancelBtn.text("取消");
                } else {
                    shopCart.confirmTitle.text("提示");
                    shopCart.confirmCon.text("请选择您要删除的商品");
                    shopCart.delBtn.hide();
                    shopCart.cancelBtn.text("确定");
                };
            });
        },
        //删除单个商品的点击事件
        singalDel: function () {
            var shopCart = this;
            this.delProduct.on("click", function () {
                shopCart.judge = "singal";
                shopCart.curUnitBtn = $(this);
                shopCart.floatBox.fadeIn(200);
                shopCart.confirmTitle.text("删除");
                shopCart.confirmCon.text("您确定要删除该商品吗？");
                shopCart.delBtn.show();
                shopCart.cancelBtn.text("取消");
            });
        },
        //悬浮提示框中的确定删除点击事件
        floatDelBtn: function () {
            var shopCart = this;
            shopCart.delBtn.on("click", function () {
                shopCart.floatBox.fadeOut(200);
                if (shopCart.judge == "global") {

                    shopCart.checkProductEd.closest(shopCart.goodsTr).remove();
                    console.log(shopCart.goodsTr);
                    if (shopCart.checkLocalPart.hasClass(shopCart.checked)) {
                        shopCart.checkLocalPartEd.closest(shopCart.goodsList).remove();
                        if (shopCart.checkAll.hasClass(shopCart.checked)) {
                            shopCart.mzContainer.html("").css("height", '25rem');
                        };
                    };
                } else if (shopCart.judge == "singal") {
                    var curLiIndex = shopCart.curUnitBtn.closest(shopCart.goodsList).index();

                    shopCart.curUnitBtn.closest(shopCart.goodsTr).remove();

                    if (shopCart.goodsList.eq(curLiIndex).find(shopCart.goodsTr).length == 0) {
                        console.log(1)
                        shopCart.goodsList.eq(curLiIndex).remove();
                    };
                };
                shopCart.dynamic1Obj();
                shopCart.dynamic2Obj();
                shopCart.calcInfo();
                shopCart.orderBtnCss();
                shopCart.fixed();
                if (shopCart.goodsTr.length == 0) {
                    shopCart.mzContainer.html("").css("height", '25rem');
                };
            });
        },
        //checkbox勾选框点击事件
        checkBox: function () {
            var shopCart = this;
            /*全选按钮*/
            shopCart.checkAll.on("click", function () {
                var $this = $(this);
                $this.toggleClass(shopCart.checked);
                shopCart.dynamic2Obj();
                if ($this.hasClass(shopCart.checked)) {
                    shopCart.checkLabelAll.addClass(shopCart.checked);
                } else {
                    shopCart.checkLabelAll.removeClass(shopCart.checked);
                };
                shopCart.calcInfo();
                shopCart.orderBtnCss();
            });

            /*分类勾选按钮*/
            shopCart.checkLocalPart.on("click", function () {
                var $this = $(this);
                $this.toggleClass(shopCart.checked);
                shopCart.dynamic2Obj();
                var $thisChildCheck = $this.closest(shopCart.goodsList).find(shopCart.checkProduct);//某一品类的单个商品勾选按钮
                if ($this.hasClass(shopCart.checked)) {
                    $thisChildCheck.addClass(shopCart.checked);
                } else {
                    $thisChildCheck.removeClass(shopCart.checked);
                };
                if (shopCart.checkLocalPartEd.length == shopCart.checkLocalPart.length) {
                    shopCart.checkAll.addClass(shopCart.checked);
                } else {
                    shopCart.checkAll.removeClass(shopCart.checked);
                }
                shopCart.calcInfo();
                shopCart.orderBtnCss();
            });
            /*具体商品勾选按钮*/
            shopCart.checkProduct.on("click", function () {
                var $this = $(this);
                $this.toggleClass(shopCart.checked);
                shopCart.dynamic2Obj();
                var $siblings = $this.closest(shopCart.goodsBody).find(shopCart.checkProduct),
                    $siblingsEd = $this.closest(shopCart.goodsBody).find(shopCart.checkProductEd),
                    $thisPart = $this.closest(shopCart.goodsList).find(shopCart.checkLocalPart);
                if ($siblings.length == $siblingsEd.length) {
                    $thisPart.addClass(shopCart.checked);
                } else {
                    $thisPart.removeClass(shopCart.checked);
                };
                if (shopCart.checkProduct.length == shopCart.checkProductEd.length) {
                    shopCart.checkAll.addClass(shopCart.checked);
                } else {
                    shopCart.checkAll.removeClass(shopCart.checked);
                };
                shopCart.calcInfo();
                shopCart.orderBtnCss();
            });
        },
        //foot结算区域位置变化
        fixed: function () {
            var offsetHeight = this.checkContainer.offset().top + this.checkContainer.outerHeight() + this.cartFoot.outerHeight() - $(window).height();
            if (offsetHeight >= $(document).scrollTop()) {
                this.cartFoot.addClass(this.fixSite);
            } else {
                this.cartFoot.removeClass(this.fixSite);
            };
        }
    }
    window.ShopCart = ShopCart;
}(window));
var shopcart = new ShopCart();
let order = [];
function Init()
{
    order = jQuery.parseJSON(localStorage.getItem('orderInfo'));
    let status = order.status;
    if(status == 0)
    {
        if(parseInt(localStorage.getItem('type')) == 0)
        {
            document.getElementById('operate').innerText = "等待接单";
        }
        else {
            document.getElementById('operate').innerText = "确认接单";
        }
    }
    else if(status == 1)
    {
        if(parseInt(localStorage.getItem('type')) == 0)
        {
            document.getElementById('operate').innerText = "确认收货";
        }
        else {
            document.getElementById('operate').innerText = "等待收货";
        }
    }
    else
    {
        document.getElementById('operate').innerText = "已完成";
    }

    GetComment();
}
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
function ChangeOrderStatus(status)
{
    let changeRequest = createXMLHttpRequest();

    changeRequest.onreadystatechange = function() {

        //这个4代表已经发送完毕之后
        if (changeRequest.readyState == 4) {
            //200代表正确收到了返回结果
            if (changeRequest.status == 200) {
                alert("操作成功！");
                window.location.reload();
            } else {
                alert(changeRequest.status+" 无法连接服务器！");
            }
        }
    };

    let url = "http://localhost:8080/ChangeOrderStatus";
    changeRequest.open("POST", url, true);
    changeRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    changeRequest.send("status="+status.toString()+"&id="+order.id);
}
function GetComment()
{
    let commentRequest = createXMLHttpRequest();

    commentRequest.onreadystatechange = function (){
        if(commentRequest.readyState == 4){
            if(commentRequest.status == 200){
                if(commentRequest.responseText != "null")
                {
                    let com = JSON.parse(commentRequest.responseText);
                    document.getElementById("comment").value = com.comment;
                    document.getElementById("grade").value = com.grade;
                    if(com.respond != undefined)
                    {
                        document.getElementById("respond").value = com.respond;
                    }

                }
                if(parseInt(localStorage.getItem("type")) == 1)
                {
                    document.getElementById("grade").onfocus=function(){
                        this.defaultIndex=this.selectedIndex;
                    };
                }
            }else{
                alert(commentRequest.status + " 无法连接服务器！");
            }
        }
    }

    let url = "http://localhost:8080/CommentServe";
    commentRequest.open("POST", url, true);
    commentRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");

    commentRequest.send("order="+order.id.toString()+"&func=0"+"&type="+localStorage.getItem('type'));
}
function SubmitComment()
{
    let commentRequest = createXMLHttpRequest();

    commentRequest.onreadystatechange = function (){
        if(commentRequest.readyState == 4){
            if(commentRequest.status == 200){
                alert("已提交！");
            }else{
                alert(commentRequest.status + " 无法连接服务器！");
            }
        }
    }

    let url = "http://localhost:8080/CommentServe";
    commentRequest.open("POST", url, true);
    commentRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    if(order.status == 2)
    {
        if(parseInt(localStorage.getItem("type")) == 0)
        {
            let id = order.id;
            let comment = document.getElementById("comment").value;
            let grade = document.getElementById("grade").value;
            commentRequest.send("order="+id.toString()+"&comment="+encodeURI(encodeURI(comment))+"&grade="
                +grade+"&type="+localStorage.getItem("type")+"&func=1");
        }
        else
        {
            let id = order.id;
            let respond = document.getElementById("respond").value;
            commentRequest.send("order="+id.toString()+"&respond="+encodeURI(encodeURI(respond))+"&type="
                +localStorage.getItem("type")+"&func=1");
        }
    }
    else
    {
        alert("订单还未完成，无法评价哦！");
    }


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
    //console.log(data);
    let str = [];
    str.push(obj.title.join(",")+"\n");
    let temp = [];
    for(let j=0;j<titleForKey.length;j++){
        temp.push(data[titleForKey[j]]);
    }
    temp.push(HandleDate(data.time));
    str.push(temp.join(",")+"\n");

    let blob = new Blob(['\uFEFF' + str.join('')], {
        type: 'text/plain;charset=utf-8',
    });
    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "export.csv";
    downloadLink.click();
}

function ExportOrder(){
    let da = {};
    da.title = ['编号','用户','金额','状态','时间'];
    da.data = order;
    exportCsv(da);
}

