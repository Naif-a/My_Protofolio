"use client";

import { useEffect, useRef } from "react";

type Point3D={x:number;y:number;z:number;size:number;phase:number};

export default function NetworkCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current,ctx=canvas?.getContext("2d");if(!canvas||!ctx)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w=0,h=0,dpr=1,raf=0,t=0,lastFrame=0,running=true;
    const pointer={x:0,y:0,tx:0,ty:0};
    let points:Point3D[]=[];
    const createSphere=()=>{
      const count=Math.max(40,Math.min(68,Math.floor(w/24)));
      points=Array.from({length:count},(_,i)=>{
        const y=1-(i/(count-1))*2;
        const radius=Math.sqrt(1-y*y);
        const theta=Math.PI*(3-Math.sqrt(5))*i;
        return{x:Math.cos(theta)*radius,y,z:Math.sin(theta)*radius,size:1.5+Math.random()*2.2,phase:Math.random()*6.28};
      });
    };
    const resize=()=>{
      dpr=Math.min(devicePixelRatio||1,1.35);w=innerWidth;h=innerHeight;
      canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);createSphere();
    };
    const project=(p:Point3D,ay:number,ax:number)=>{
      const x1=p.x*Math.cos(ay)-p.z*Math.sin(ay),z1=p.x*Math.sin(ay)+p.z*Math.cos(ay);
      const y1=p.y*Math.cos(ax)-z1*Math.sin(ax),z2=p.y*Math.sin(ax)+z1*Math.cos(ax);
      const scale=1.8/(2.7-z2);
      const radius=Math.min(w,h)*.49;
      return{x:w*.5+x1*radius*scale,y:h*.48+y1*radius*scale,z:z2,scale};
    };
    const draw=(now=0)=>{
      if(!running){raf=requestAnimationFrame(draw);return;}
      if(now-lastFrame<32){raf=requestAnimationFrame(draw);return;}
      lastFrame=now;
      ctx.clearRect(0,0,w,h);
      if(!reduced)t+=.0022;
      pointer.x+=(pointer.tx-pointer.x)*.025;pointer.y+=(pointer.ty-pointer.y)*.025;
      const ay=t+pointer.x*.22,ax=.18+pointer.y*.13;
      const projected=points.map(p=>project(p,ay,ax));

      ctx.save();ctx.translate(w*.5,h*.48);ctx.rotate(-.18+pointer.x*.03);
      for(let i=0;i<3;i++){
        ctx.beginPath();ctx.ellipse(0,0,Math.min(w,h)*(.24+i*.07),Math.min(w,h)*(.085+i*.025),0,0,Math.PI*2);
        ctx.strokeStyle=`rgba(${i===1?"174,129,255":"102,217,239"},${.08-i*.012})`;ctx.lineWidth=.8;ctx.stroke();
      }
      ctx.restore();

      for(let i=0;i<projected.length;i++)for(let j=i+1;j<projected.length;j++){
        const a=projected[i],b=projected[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<88&&Math.abs(a.z-b.z)<.56){
          const alpha=(1-d/88)*(.11+((a.z+b.z+2)/4)*.22);
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(102,217,239,${alpha})`;ctx.lineWidth=.65;ctx.stroke();
        }
      }
      projected.forEach((p,i)=>{
        const front=(p.z+1)/2,pulse=.75+Math.sin(t*6+points[i].phase)*.25;
        const r=points[i].size*(.65+p.scale)*pulse;
        const hue=i%7===0?"174,129,255":i%5===0?"255,126,179":"111,232,201";
        ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${hue},${.24+front*.72})`;
        ctx.shadowColor=`rgba(${hue},.75)`;ctx.shadowBlur=front*12;ctx.fill();ctx.shadowBlur=0;
      });
      raf=requestAnimationFrame(draw);
    };
    const move=(e:PointerEvent)=>{pointer.tx=(e.clientX/w-.5)*2;pointer.ty=(e.clientY/h-.5)*2};
    const visibility=()=>{running=!document.hidden;};
    resize();raf=requestAnimationFrame(draw);addEventListener("resize",resize);addEventListener("pointermove",move,{passive:true});document.addEventListener("visibilitychange",visibility);
    return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize);removeEventListener("pointermove",move);document.removeEventListener("visibilitychange",visibility)};
  },[]);
  return <canvas ref={ref} className="network-canvas" aria-hidden="true"/>;
}
