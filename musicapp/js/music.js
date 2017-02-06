function resize(Origin,type){
	var widths=document.documentElement.clientWidth;
	var heights=document.documentElement.clientHeight;
	var type=type||"x";
	if(type=="x"){
		var scale=widths/Origin*100;
	}else if(type=="y"){
		var scale=heights/Origin*100;
	}
	document.getElementsByTagName("html")[0].style.fontSize=scale+"px";
}
resize(750,"x");

$(function(){
	/**************下拉界面通用***************/
	var index_main = new Swiper('.index_main', {
		direction: 'vertical',
		slidesPerView: 'auto',
		mousewheelControl: true,
		freeMode: true
	});

    /*****************播放界面******************/
	var play_main = new Swiper('.play_main', {
		pagination: '.play_main .swiper-pagination',
		paginationClickable: true,
		parallax: true,
		speed: 1000
	});

	/**************专辑页面和详情页面***************/
	var albumcon_show = new Swiper('.albumcon_show', {
		scrollbar: '.swiper-scrollbar',
		direction: 'vertical',
		slidesPerView: 'auto',
		mousewheelControl: true,
		freeMode: true
	});

    /**************通用下拉界面******************/
	//var myScroll = new IScroll('.index_main', {
	//	//scrollbars: true,
	//	mouseWheel: true,
	//	interactiveScrollbars: true,
	//	shrinkScrollbars: 'scale',
	//	fadeScrollbars: true
	//});
	//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    //
    //


});
