/**
 * Created by Lewis on 2016/12/2.
 */
$(function () {
//设计尺寸统一规范
    function resise(designSize,type) {
        var type= type || "x";
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if(type == "x"){
            var scale = width/designSize*100+"px";
        }else if(type == "y"){
            var scale = height/designSize*100+"px";
        }
        document.getElementsByTagName("html")[0].style.fontSize = scale;
    }
    resise(750);

//swiper插件启用
    var mySwiper = new Swiper ('.swiper-container', {
        // 如果需要分页器
        // pagination: '.swiper-pagination',

        //添加动画
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }

    });

//主页菜单导航
    var navXinwen = $("#nav .xinwen");
    navXinwen.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".shouye .menu").css("display","none");
        $("#index").css("display","block");
    });
    var navLuntan = $("#nav .luntan");
    navLuntan.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".shouye .menu").css("display","none");
        $("#mudi").css("display","block");
    });
    var navXiaoxi = $("#nav .xiaoxi");
    navXiaoxi.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".shouye .menu").css("display","none");
        $("#xiaoxi").css("display","block");
    });
    var navWode = $("#nav .wode");
    navWode.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".shouye .menu").css("display","none");
        $("#wode").css("display","block");
    });

//首页中目的地页面侧边导航
    $(".shouye #mudi .content .list .item").on("click",function () {
        $(".shouye #mudi .content .list .item").removeClass("active");
        $(this).addClass("active");
        $(".shouye #mudi .content .jingdian .option").hide().eq($(this).index()-1).fadeIn();
    });

//首页中热议页面顶部导航
    $(".shouye #xiaoxi .head h3 b:nth-child(1)").on("click",function () {
        $(".shouye #xiaoxi .head h3 b").removeClass("active");
        $(this).addClass("active");
        $(".shouye #xiaoxi .re").hide();
        $(".shouye #xiaoxi .reyi").fadeIn();
    });
    $(".shouye #xiaoxi .head h3 b:nth-child(2)").on("click",function () {
        $(".shouye #xiaoxi .head h3 b").removeClass("active");
        $(this).addClass("active");
        $(".shouye #xiaoxi .re").hide();
        $(".shouye #xiaoxi .wenda").fadeIn();
    });

});