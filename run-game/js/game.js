function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=0;
    this.y=480;
    this.width=240;
    this.height=160;
    this.speedx=5;
    this.speedy=5;
    this.zl=0.5;
    this.status="runs";
    this.state=0;
    this.life=3;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,600,400,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
function hinder(canvas,cobj,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.x=canvas.width-200;
    this.y=530;
    this.width=70;
    this.height=70;
    this.state=0;
};
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state],0,0,300,300,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
//血
function lizi(canvas,cobj){
    this.x=0;
    this.y=0;
    this.canvas=canvas;
    this.cobj=cobj;
    this.w=canvas.width;
    this.h=canvas.height;
    this.speedx=4*Math.random()-2;
    this.speedy=6*Math.random()-3;
    this.zhongli=0.5;
    this.r=2+1*Math.random();
    this.speedr=0.1;
    this.color="red";
}
lizi.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
};
// xue();
function xue(canvas,cobj,x,y){
    var arr=[];
    for(i=0;i<50;i++){
        var obj=new lizi(canvas,cobj);
        obj.x=x-80;
        obj.y=y-10;
        arr.push(obj);
    }
    var t=setInterval(function(){
        cobj.clearRect(0,0,this.w,this.h);
        for(i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
    },50);
    if(arr.length==0){
        clearInterval(t);
    }
}
//子弹
function lizi1(canvas,cobj,zidanImg){
    this.x=0;
    this.y=0;
    this.canvas=canvas;
    this.w=canvas.width;
    this.h=canvas.height;
    this.cobj=cobj;
    this.width=100;
    this.height=30;
    this.color="blue";
    this.speedx1=5;
    this.jia=1;
    this.zidanImg=zidanImg;
    this.state=0;

}
lizi1.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zidanImg[this.state],0,0,300,100,0,0,this.width,this.height);
        this.cobj.restore();
    },
    update:function(){
        this.speedx1+=this.jia;
        this.x+=this.speedx1;
    }
};

//游戏主类
function game(canvas,cobj,runs,jumps,hinderImg,runA,zidanA,jumpA,dieA,progress,jifen,zidanImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.width=canvas.width;
    this.height=canvas.height;
    this.speedx=10;
    this.hinderArr=[];
    this.progress=progress;
    this.jifen=jifen;
    this.store=0;
    this.isfir=false;
    this.name="";
    this.runA=runA;
    this.zidanA=zidanA;
    this.jumpA=jumpA;
    this.dieA=dieA;
    this.zidanImg=zidanImg;
    this.zobj=new lizi1(canvas,cobj,zidanImg);
    this.person=new person(canvas,cobj,runs,jumps);
    this.isrun=false;
    //move
    this.ts={};
    this.num=0;
    this.num1=0;
    this.top=0;
    this.num2=0;
    this.rand=(Math.ceil((2+Math.random()*3)))*1000;
    //move2
    this.flag=true;
    this.inita=0;
    this.speeda=5;
    this.r=80;
    this.y1=this.person.y;

}
game.prototype={
    play:function(start,mask){
        this.name=prompt("请输入用户名","lewis");
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        this.run();
        this.key();
        this.zhezhao();
    },
    run:function(){
        var that=this;
        that.runA.play();

        that.ts.t1=setInterval(function(){
            that.move();

        },50);

    },
    move:function(){
        var that=this;
        that.num++;
        that.num1+=7;
        that.cobj.clearRect(0,0,that.width,that.height);
        if(that.person.status=="runs"){
            that.person.state=that.num%8;
        }else{
            that.person.state=0;
        }

        /*让人物的x发生变化*/
        that.person.x+=that.person.speedx;
        if(that.person.x>that.person.width/3){
            that.person.x=that.person.width/3;
        }
        // that.person.y=top;
        //操作背景
        that.person.draw();
        that.canvas.style.backgroundPositionX=-that.num1+"px";

        // 障碍物
        if(that.num2%that.rand==0){
            that.num2=0;
            var obj=new hinder(that.canvas,that.cobj,that.hinderImg);
            obj.state=Math.floor(Math.random()*that.hinderImg.length);
            that.hinderArr.push(obj);
        }
        if(that.hinderArr.length>5){
            that.hinderArr.shift();
        }
        // var jifen=document.querySelector(".jifen");
        for(var i=0;i<that.hinderArr.length;i++){
            that.hinderArr[i].x-=that.speedx;
            that.hinderArr[i].draw();
            if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                if(!that.hinderArr[i].flag){
                    that.person.life--;
                    that.dieA.play();
                    that.progress.style.background="#86e01e";
                    that.progress.style.width=180-(3-that.person.life)*45+"px";
                    xue(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                    if(that.person.life<0){
                        // alert("Game Over!");
                        // location.reload();
                        //存储
                        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];

                        var temp={name:that.name,store:that.store};
                        // 排序
                        if(messages.length>0){
                            messages.sort(function(a,b){
                                return a.store<b.store;
                            });
                            if(messages.length==3){
                                if(temp.store>messages[messages.length-1].store){
                                    messages[messages.length-1]=temp;
                                }
                            }else if(messages.length<3){
                                messages.push(temp);
                            }
                        }else{
                            messages.push(temp);
                        }

                        localStorage.messages=JSON.stringify(messages);
                        messages.push(temp);
                        // location.reload();
                        that.over();
                    }
                }
                that.hinderArr[i].flag=true;
            }else if(that.hinderArr[i].x+that.hinderArr[i].width<that.person.x){
                if(!that.hinderArr[i].flag1&&!that.hinderArr[i].flag){
                    document.title=++that.store;
                    that.jifen.innerHTML=that.store;
                }
                that.hinderArr[i].flag1=true;
            }

            //操作子弹
            if(that.isfir){
                if(hitPix(that.canvas,that.cobj,that.zobj,that.hinderArr[i])){
                    that.hinderArr.splice(i,1);
                    that.cobj.clearRect(0,0,that.w,that.h);
                    document.title=++that.store;
                    that.jifen.innerHTML=that.store;
                    that.zidanA.play();
                }
            }


        }

        if(that.isfir){
            if(that.zobj.x>600){
                that.isfir=false;
                that.zobj.speedx1=5;
            }
            that.zobj.update();
            that.zobj.draw();

        }
        that.num2+=50;
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            if(e.keyCode==38){
                if(!that.isrun){
                    for(var i in that.ts){
                        clearInterval(that.ts[i]);
                    }
                    that.runA.pause();
                    that.isrun=true;
                }else if(that.isrun){
                    that.ts.t1=setInterval(function(){
                        that.move();
                    },50);
                    if(!that.flag){
                        clearInterval(that.ts.t2);
                        that.ts.t2=setInterval(function(){
                            that.move2();
                        },50);
                    }
                    that.runA.play();
                    that.isrun=false;
                }
            }else if(e.keyCode==32){
                if(!that.flag){
                    return;
                }
                that.flag=false;
                that.jumpA.play();
                that.runA.pause();
                that.person.status="jumps";
                that.ts.t2=setInterval(function(){
                    that.move2();
                },50)
            }
        }
    },
    move2:function(){
        var that=this;
        that.inita+=that.speeda;
        var top1=Math.sin(that.inita*Math.PI/180)*that.r;
        if(that.inita>=180){
            clearInterval(that.ts.t2);
            that.runA.play();
            that.person.y=that.y1;
            that.person.status="runs";
            that.flag=true;
            that.inita=0;
        }else{
            that.person.y=that.y1-top1;
        }
    },
    over:function(){
        for(var i in this.ts){
            clearInterval(this.ts[i]);  //关闭所有的计时器
        }
        var over=document.querySelector(".over");
        over.style.animation="start 2s ease forwards";
        this.runA.pause();
        //记录分数
        var scoreEle=document.querySelector(".scoreEle");
        scoreEle.innerHTML=this.store;
        var lis=document.querySelector(".over ul");
        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
        var str="";
        for (var i = 0; i < messages.length; i++) {
            str+="<li>"+messages[i].name+"："+messages[i].store;
        }
        lis.innerHTML=str;
        this.again();
    },
    again:function(){
        var that=this;
        var btn1=document.querySelector(".again");
        btn1.onclick=function(){
            var over=document.querySelector(".over");
            over.style.animation="start1 2s ease forwards";
            that.person.x=0;
            that.person.y=500;
            that.store=0;
            that.person.life=3;
            that.hinderArr=[];
            that.inita=0;
            that.y1=that.person.y;
            that.jifen.innerHTML=that.store;
            that.progress.style.background="greenyellow";
            that.progress.style.width=180+"px";
            that.run();
            btn1.onclick=null;
        }
    },
    zhezhao:function(){
        var that=this;
        var mask=$(".mask");
        mask.click(function(){
            if(that.isfir){
                return false;
            }
            that.isfir=true;
            that.zobj.x=that.person.x+that.person.width/2;
            that.zobj.y=that.person.y+that.person.height/2;

        })

    }

};