var sss=document.querySelector('canvas')
		sss.height=700
        sss.width=700
        var scr=0
        var no=100
        var lv=2
        var can=sss.getContext('2d')
        var oby=-6
        var bx=350;var by=650;var dbx=5; var dby=-4
        var hx=350;var hy=690;var dhx=0
        function object(x,y,lv){
        	this.x=x; this.y=y; this.lv=lv
        	this.create=function(){
                if(this.lv>1){can.fillStyle='grey'}
                else{can.fillStyle="red"}     		
        		if(this.lv!=0){can.fillRect(this.x,this.y,100,10)
        		if(bx+5>this.x && bx-5<this.x+100 && by+5>this.y && by-5<this.y+10){this.lv-=1; dby=-dby;
                     scr+=1; document.getElementById("scorebar").innerHTML="score: "+scr;
                     if(this.lv==0){
                        var au=document.getElementById('shatter')
                        au.loop=true; au.play(); au.loop=false
                     }
                     if(this.lv!=0){
                    var aud=document.getElementById('hit')
                    aud.loop=true; aud.play(); aud.loop=false;}
                }}
        	}
        }
        var oblist=[]
            for(var i=0; i<no; i++){var objx=100*Math.round(6*Math.random()); var objy=10*Math.round(40*Math.random()); var lp=lv;
            oblist[i]=new object(objx,objy,lp);
            }
    
        function moveh(a){if(a==1){dhx+=14}else if(a==2){dhx-=14}}
        function autopilot(){if(bx<hx && bx<hx+200){moveh(2)}; if(bx>hx+200 && bx>hx){moveh(1)}}
        function ball(){
        	
        	if(scr<200){window.requestAnimationFrame(ball)}
        	can.clearRect(0,0,700,700)
            for(var i=0; i<no; i++){oblist[i].create()}
        	can.beginPath()
        	can.arc(bx,by,5,0,Math.PI*2,true)
            can.fillStyle="black"
            can.fill()
            can.fillStyle="green"
            can.fillRect(hx,hy,200,50)
            if(hx+200>700){hx=499}
            if(hx<0){hx=1}
            if(bx+5>700 || bx-5<0){dbx=-dbx}
            if(by-5<0){dby=-dby}
            if(scr==200){
                document.getElementById('youwin').play()
                document.getElementById('win').style.visibility='visible'
            }
            if(bx+5>hx && bx-5<hx+200 && by+5>hy && by-5<hy+50){dby=oby; dbx+=(bx-hx-100)/50}
            bx+=dbx
            by+=dby
            hx+=dhx
            if(dhx!=0){dhx-=dhx/7}
        }
        function react(){setTimeout(function(){if(scr/lv<no){autopilot();react()}},3*(hy-by))}
        ball()
        window.addEventListener('keydown',event=>{
            if(event.key=='ArrowRight'){moveh(1)}
            if(event.key=='ArrowLeft'){moveh(2)}
        })
      
        //react()