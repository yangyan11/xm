$(function(){
	function Game(main,scorele,stateele,lifeele){
		this.main=main;
		this.mainWidth=main.offsetWidth;
		this.mainHeight=main.offsetHeight;
		this.obj={};
		this.kaiguan1=true;
		this.speed=3;
		this.scor=0;
		this.scorele=scorele;
		this.state=1;
		this.stateele=stateele;
		this.num=3;
		this.life=3;
		this.lifeele=lifeele;
	}
	Game.prototype={
		start:function(){
			if (this.kaiguan1) {
				this._keydown();
				this._move();
				this.kaiguan1=false;
				for (var i = 0; i < this.num; i++) {
					this._createletter()
				}
			}	
		},
		_createletter:function(){
			var newletter=document.createElement("div");
			do{
				var randomleft=Math.random()*(this.mainWidth-80);
			}while(this._checkleft(randomleft))
			var randomtop=-Math.random()*200;
			newletter.style.cssText="width:80px;height:80px;border:1px solid #000;border-radius: 50%;background-color: #ffbbcc;font-size:50px;text-align: center;line-height: 80px;position:absolute;left:"+randomleft+"px;top:"+randomtop+"px;"
			do{
				var randomnum=Math.floor(Math.random()*26+65);
				var randomchar=String.fromCharCode(randomnum);
			}while(this.obj[randomchar])
			this.obj[randomchar]={left:randomleft,top:randomtop,el:newletter};
			newletter.innerHTML=randomchar;
			this.main.appendChild(newletter)			
		},
		_move:function(){
			var that=this;
			this.st=setInterval(function(){
				for(i in that.obj){
					var oldtop=that.obj[i].top;
					var newtop=oldtop+that.speed;
					that.obj[i].top=newtop;
					that.obj[i].el.style.top=newtop+"px";
					if (newtop>that.mainHeight) {
						that.life--;
						that.lifeele.innerHTML=that.life;
						that.main.removeChild(that.obj[i].el);
						delete that.obj[i];
						that._createletter();
						if (that.life<=0) {
							that._end();
						};
					};
				}
			},60)
		},
		stop:function(){
			clearInterval(this.st);
		},
		_checkleft:function(newleft){
			for(i in this.obj){
				if (newleft>this.obj[i].left-80&&newleft<this.obj[i].left+80) {
					return true
				}
			}
		},
		_pass:function(){
			this.state++;
			alert("恭喜过关，接下来进入"+this.state+"关")
			this.stateele.innerHTML=this.state;
			this.main.innerHTML="";
			this.obj={};
			if (this.state<=3) {
				this.num++;
			}else{
				this.speed++;
			}
			for (var i = 0; i < this.num; i++) {
				this._createletter();
			};
		},
		_keydown:function(){
			var that=this;
			document.onkeydown=function(e){
				var ev=e||window.event;
				var kc=ev.keyCode;
				var newletter=String.fromCharCode(kc);
				if (that.obj[newletter]) {
					that.main.removeChild(that.obj[newletter].el)
					delete that.obj[newletter];
					that._createletter();
					that.scor++;
					that.scorele.innerHTML=that.scor;
					if (that.scor%10==0) {
						that._pass();
					};
				};
			}
		},
		_end:function(){
			alert("游戏结束");
			this.main.innerHTML="";
			this.obj={};
			this.kaiguan1=true;
			this.scor=0;
			this.scorele.innerHTML=this.scor;
			this.life=3;
			this.lifeele.innerHTML=this.life;
			this.state=1;
			this.stateele.innerHTML=this.state;
			this.num=3;
			this.speed=3;
		}
	}
	var main=$(".main")[0];
	var startbtn=$(".start")[0];
	var scor=$(".scor")[0];
	var state=$(".state")[0];
	var life=$(".life")[0];
	var stop=$(".stop")[0];
	var end=$(".end")[0];
	var newgame=new Game(main,scor,state,life);
	startbtn.onclick=function(){
		newgame.start()
	}
	var flag=true;
	stop.onclick=function(){
		if (flag) {
			flag=false;
			newgame.stop();
			this.innerHTML="继续"
		}else{
			flag=true;
			newgame._move();
			this.innerHTML="暂停"
		}
	}
	end.onclick=function(){
		if (flag) {
			newgame._end();
		}
	}















})