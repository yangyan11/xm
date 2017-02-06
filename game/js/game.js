function person(can,cobj,run,drmp,xueliang){
    this.cobj=cobj;
    this.run=run;
    this.drmp=drmp;
    this.num=-1;
    this.y=100;
    this.x=400;
    this.status='run';
    this.can=can;
    this.width=183;
    this.height=120;
    this.xueliang=xueliang;
}
person.prototype={
   draw:function(){
        var that=this;
            this.num++;

          this.y+=100;
          this.x+=100;
          this.cobj.save();
        if(this.num>=this[this.status].length){
                this.num=0;
            }
        if(this.y>=530){
            // this.ty+=100;
            // if(this.ty>=180){
            //     this.y=450;
            // }
            this.y=530;




        }
        if(this.x>=400){
            this.x=400;
        }
            this.cobj.drawImage(that[this.status][this.num],1,0,283,220,this.x,this.y,this.width,this.height);
           this.cobj.restore(); 

    }
}

function game(can,cobj,run,drmp,za,xueliang,guan,over) {
    this.cW=document.documentElement.clientWidth||document.body.clientWidth;
    this.cH=document.documentElement.clientHeight||document.body.clientHeight;
    this.xueliang=xueliang;
    this.person=new person(can,cobj,run,drmp);
    this.za=new hider(cobj,can,za,this.cW,this.cH);
    this.zaimg=za;
    this.cobj=cobj;
    this.can=can;
    this.felg=false;
    this.hiderarr=[];
    this.shenmin=5;
    this.hider=new hider(this.cobj,this.can,this.zaimg,this.cW,this.cH);
    this.isfile=false;
    this.zidan=new zidan(cobj);
    this.xue=new xue(this.cobj,this.cW,this.cH);
    this.guan=1;
    this.guanbox=guan;
    this.over=over;
   


}
game.prototype={
    play:function(start,msk){
        start.style.display='none';
        msk.style.display='none';
        this.guanbox.style.display='block';
        this.msk=msk;
        this.over.style.display='none';
        this.yundong();
        this.mouse();
        if(this.felg){
            this.dianji();
        }

    },
    yundong:function () {
         var num=0;
         var zanum=0;
         var ran=Math.ceil(Math.random()*4)*1000+4000;
         var that=this;
        that.xueliang.style.display='block';
        this.felg=true;
        var gtime=setInterval(function () {
            num+=5;
            zanum+=100;
            that.guanbox.innerHTML='你已成为'+that.guan+'级神猪';
            that.cobj.clearRect(0,0,that.cW,that.cH);
            if(zanum%ran==0){
                ran=Math.ceil(Math.random()*4)*1000+4000;
                var hiderobj=new hider(that.cobj,that.can,that.zaimg,that.cW,that.cH);
                that.hiderarr.push(hiderobj);
            }
            for(var i=0;i<that.hiderarr.length;i++){
                that.hiderarr[i].x-=that.hider.speedx;
                that.hiderarr.zanum=parseInt(Math.random()*3);
                that.hiderarr[i].draw();
                if(!that.hiderarr[i].felg){
                    if(hitPix(that.can,that.cobj,that.person,that.hiderarr[i])){
                        lizi(that.cobj,that.person.x+160,that.person.y+100,'red');
                        if(!that.hiderarr[i].felg){
                            that.hiderarr[i].felg=true;
                            that.shenmin--;
                            if(that.shenmin<=0){
                                that.xueliang.style.display='none';
                                that.over.style.display='block';
                                that.msk.style.display='block';
                                clearInterval(gtime);
                            }

                        }
                    }
                }

                if(that.person.x>that.hiderarr[i].x+that.hiderarr[i].width){
                    if(!that.hiderarr[i].felg&&!that.hiderarr[i].felg1){
                        that.hiderarr[i].felg1=true;
                    }
                }
                if(hitPix(that.can,that.cobj,that.zidan,that.hiderarr[i])){
                    lizi(that.cobj,that.zidan.x,that.zidan.y,'rgb('+parseInt(255*Math.random())+','+parseInt(255*Math.random())+','+parseInt(255*Math.random())+')');
                    that.hiderarr.splice(i,1);
                    that.shenmin++;

                    if(that.shenmin>=10){
                        console.log('此时的生命'+that.hider.speedx);
                        that.shenmin=3;
                        that.guan++;
                        Math.ceil(Math.random()*4)*1000+2000
                        that.hider.speedx+=20;
                    }
                }
            }
            that.xueliang.style.width=that.shenmin*20+'px';  
            that.person.draw();
            that.can.style.backgroundPosition=-num+"px -100px";
            //子弹
           if(that.isfile){
               that.zidan.x+=50;
               that.zidan.y+=40;
               that.zidan.draw();
           }

        },100);
    },
    dianji:function () {
        var that=this;
        var felg=true;
        document.onkeydown=function(e){
          var e=e||window.event;
            var y=that.person.y;
            var t=500;
            console.log(t);
           if(e.keyCode==32){
               if(!felg){
                   return;
               }
               that.person.status='drmp';
               // that.person.sin=Math.sin(Math.PI*that.person.ty);
               var ang=0;
               var t=setInterval(function () {
                       ang+=15;
                       if(ang>=180){
                           that.person.status='run';
                           that.person.y=y;
                           ang=0;
                           felg=true;
                           that.xueliang.style.top=500+'px'
                           clearInterval(t);
                       }else{
                           felg=false;
                           var top=Math.sin(Math.PI/180*ang)*300;
                           that.person.y=y-top;
                           var aa=t-top;
                           console.log(aa);
                           that.xueliang.style.top=400+'px';

                       }

               },80)
           }
        }
    },
    mouse:function(){
        var that=this;
       this.can.onclick=function(){
            that.isfile=true;
           that.zidan.x=that.person.x+200;
           that.zidan.y=that.person.y+90;
        }
    }
}


function hider(cobj,can,za,cw,ch){
 this.za=za;
 this.can=can;
 this.cobj=cobj;
 this.cw=cw;
 this.ch=ch;
 this.x=this.cw+30;
 this.y=580;
 this.width=60;
 this.height=60;
 this.zanum=parseInt(Math.random()*3);
 this.speedx=20;   
}
hider.prototype={
   draw:function(){
       this.cobj.save();
       this.cobj.drawImage(this.za[this.zanum],0,0,100,100,this.x,this.y,this.width,this.height);
       this.cobj.restore();
   }
}


function xue(cobj,cw,ch){
    this.cobj=cobj;
    this.cw=cw;
    this.ch=ch;
    this.r=Math.random()*5+2;
    this.x=0;
    this.y=0;
    this.speedx=Math.random()*6-3;
    this.speedy=2;
    this.zhongli=0.5;
    this.color='red';
}

xue.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        this.cobj.arc(0,0,this.r,0,Math.PI*2,false);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=1;
    }
}
function lizi(cobj,x,y,color){
    var arr = [];

    for(var i = 0;i<10;i++)
    {
        var obj = new xue(cobj,x,y);
        obj.color=color;
        obj.x = x;
        obj.y = y;
        arr.push(obj);
    }
    var t = setInterval(function(){
        for(var i = 0;i<arr.length;i++)
        {

            arr[i].draw();
            arr[i].update();

            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length==0){
            clearInterval(t);
        }
    },50)
}

function zidan(cobj){
 this.cobj=cobj;
 this.x=0;
 this.y=0;
 this.width=10;
 this.height=10;
 this.color='rgb('+parseInt(255*Math.random())+','+parseInt(255*Math.random())+','+parseInt(255*Math.random())+')'   

}
zidan.prototype={
    draw:function(){
       var that=this;
            that.cobj.save();
            that.cobj.beginPath();
            that.cobj.translate(that.x,that.y);
            that.cobj.fillStyle='rgb('+parseInt(255*Math.random())+','+parseInt(255*Math.random())+','+parseInt(255*Math.random())+')';
            that.cobj.arc(0,0,this.width,0,Math.PI*2);
            that.cobj.fill();
            that.cobj.restore();


    }

}
