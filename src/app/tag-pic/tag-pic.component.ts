import { Component, OnInit } from '@angular/core';
import { RouterState } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import * as $ from 'jquery';

import {GetScopeService} from '../tag-pic-service/get-scope.service'
import { getJSON } from 'jquery';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-tag-pic',
  templateUrl: './tag-pic.component.html',
  styleUrls: ['./tag-pic.component.css']
})
export class TagPicComponent implements OnInit {

  ngOnInit(): void {
    //this.setfanwei();
    
  }

  constructor(
    private getscope:GetScopeService){
      console.log("come in constructor");
      console.log(this.getscope);
      console.log(this);
  }
  ngAfterViewInit():void{
    //依次角度 crane xmin xmax ymin ymax
    var idInput:string[]=['','crane','lane','video','lorr','degree','xmin','xmax','ymin','ymax'];
    var divi=document.createElement("div");//装input框
    var pr=document.getElementById('picResolve');
    for(var j=1;j<=9;j++)
      {
        var tempdiv=document.createElement('div');
        var input=document.createElement('input');
        var span=document.createElement('span');
        span.innerHTML=idInput[j];
        input.width=30;
        input.height=10;
        input.id=idInput[j];
        console.log(input.id);
        tempdiv.appendChild(span);
        tempdiv.appendChild(input);
        divi.appendChild(tempdiv);
      }

    pr.appendChild(divi);
      var bt=document.createElement('button');
      bt.innerHTML='getScope';
      bt.onclick=this.setfanwei.bind(this);
      pr.appendChild(bt);

      var buttonsdiv=document.createElement('button');
      var divbutton=document.createElement('div');
      divbutton.id='db';
      buttonsdiv.innerHTML='clip';
      divbutton.onclick=this.clip;
      divbutton.appendChild(buttonsdiv);


    pr.appendChild(divbutton);

  }


  //将图片对象转化为画布，返回画布
 ImageToCanvas() {

  var image=(<HTMLImageElement>(document.getElementById('showpic')));
  var canvas = <HTMLCanvasElement>(document.getElementById('piccanvas'));
  canvas.width = image.width;
  canvas.height = image.height;
  console.log("imagewidth imageheight",image.width,image.height);
  image.crossOrigin="";
  var ctx=canvas.getContext("2d");
  image.onload=function(){
    ctx.drawImage(image,0,0);
  }
  //
  
  //canvas.getContext("2d").drawImage(image, 0, 0);//0, 0参数画布上的坐标点，图片将会拷贝到这个地方


  //var obj = <HTMLImageElement>document.getElementById("showpic");
　 //obj.style.display="none";
　//parentObj.removeChild(obj);//通过div的父对象把它删除*/
  return canvas;
  }
  getImgbyHttp()
  {
    console.log("getImg by http start");
    var canvas = <HTMLCanvasElement>(document.getElementById('piccanvas'));
    var ctx=canvas.getContext("2d");
    canvas.height=canvas.height;
    var pic=(<HTMLImageElement>(document.getElementById('showpic')));
    var url=(<HTMLInputElement>document.getElementById('picurl')).value;

    $.get(url,function(data)
    {
      console.log(data);
    })
    console.log(url);
    pic.src=url;
  }
  getImgbyPath()
  {
    console.log("getImg by path start");

    //

    
      
      //divbutton.setAttribute("onclick","clip();");
    //
    var inputFile=(<HTMLInputElement>document.getElementById('upload-input')).files;
    var picresolve=document.getElementById("picResolve");
   // picresolve.innerHTML="";

    console.log('inputFile.length',inputFile.length);
    for(var i=0;i<inputFile.length;i++)
    {
      var kuangzi=document.createElement('div');
      var imgi=document.createElement("img");
      imgi.id='pic'+(i+1);

      console.log(inputFile);
        var url=window.URL.createObjectURL(inputFile[i]);
        console.log(url);
        imgi.src=url;
      //插入显示图片的画布
      var canvasshowpici=document.createElement('canvas');
      canvasshowpici.id='canvasshowpic'+(i+1);

      canvasshowpici.width=canvasshowpici.width;
      


      var canvasi=document.createElement('canvas');
      canvasi.id='canvas'+(i+1);
      canvasi.width=1440;
      canvasi.height=960;
      
      
      

        kuangzi.appendChild(imgi);kuangzi.appendChild(canvasshowpici); kuangzi.appendChild(canvasi);
        picresolve.appendChild(kuangzi);
      }
    
  }
   clip(event){
    //var some=event.currentTarget;
    //var Seq=some.id;
    //console.log('Seq',Seq);
    //var getSeq=Seq.substring(Seq.lastIndexOf("b")+1);
    //console.log('getSeq',getSeq);
    console.log("clip start ");
    var num;
    console.log('num',num);

    var inputFile=(<HTMLInputElement>document.getElementById('upload-input')).files;
    num=inputFile.length;

    console.log("num",num);
    var getSeq;
    for(var i=1;i<=num;i++)
    {
      getSeq=i;
      var image=(<HTMLImageElement>(document.getElementById('pic'+getSeq)));

      var piccanvas=<HTMLCanvasElement>(document.getElementById('canvasshowpic'+getSeq));
    var canvas = <HTMLCanvasElement>(document.getElementById('canvas'+getSeq));
    var x_min=Number((<HTMLInputElement>document.getElementById('xmin')).value);
    var x_max=Number((<HTMLInputElement>document.getElementById('xmax')).value);
    var y_min=Number((<HTMLInputElement>document.getElementById('ymin')).value);
    var y_max=Number((<HTMLInputElement>document.getElementById('ymax')).value);
    var angle=Number((<HTMLInputElement>document.getElementById('degree')).value);
    var xcenter=Number(-x_min+x_max);
    var ycenter=Number(-y_min+y_max);
    var maxbian=Math.max(xcenter,ycenter);
    console.log("x_min x_max y_min y_max angle");
    console.log(Number(x_min),Number(y_min),Number(x_max),Number(y_max),angle);
    //var c=this.ImageToCanvas();
    //var ctx=c.getContext("2d");
    image.crossOrigin="";


      //画标注图
      var ctxpic=piccanvas.getContext('2d');
      //image.onload=function(){
        console.log("onloadfunction执行");
        console.log("imageWid imageHeight",image.width,image.height);
        piccanvas.width=1280;
        piccanvas.height=720;
        console.log("piccanvaswid piccanvasheight",piccanvas.width,piccanvas.height);

        ctxpic.drawImage(image,0,0,image.width,image.height,0,0,1280,720);
        ctxpic.rect(x_min,y_min,x_max-x_min,y_max-y_min);
        ctxpic.stroke();
      //}
    //画裁剪后的图片
    var ctx=canvas.getContext("2d");
    //image.onload=function(){

    canvas.width=canvas.width;
      ctx.translate(2*maxbian,2*maxbian);
      ctx.rotate(angle * Math.PI / 180);
      ctx.drawImage(piccanvas,x_min,y_min,x_max-x_min,y_max-y_min,0,0,x_max-x_min,y_max-y_min);
      //ctx.drawImage(image,0,0,image.width,image.height,0,0,image.width,image.height);
      //c
      //
      
    
    
 // }
    //var imgData=ctx.getImageData(Number(x_min),Number(y_min),Number(x_max),Number(y_max));
    //ctx.putImageData(imgData,0,0);
    }


  }
  setfanwei():void
  {
    console.log("setfanweiStart");

    var datae;
    var crane=<HTMLInputElement>document.getElementById('crane');
    var lane=<HTMLInputElement>document.getElementById('lane');
    var video=<HTMLInputElement>document.getElementById('video');
    var lorr=<HTMLInputElement>document.getElementById('lorr');
    console.log('crane,lane',crane.value,lane.value);
    if((lorr.value)=='r'){lane.value=(String)((Number)(lane.value)+10);}
    console.log(this);
    console.log('getscope',this.getscope);
    this.getscope.getScope(crane.value,lane.value).subscribe(
      function(data){
        this.datae=data;
        console.log('data',data);
        console.log(typeof(data));
        var str=JSON.stringify(data);
        console.log("str ",str,typeof(str));
        var json=JSON.parse(str).info;
        var svideo='video'+(<HTMLInputElement>document.getElementById('video')).value;
        console.log("json",json[svideo] );
        json=json[svideo];
        console.log("xmin",json.x_min);
        console.log("xmax",json.x_max);
        console.log("ymin",json.y_min);
        console.log("ymax",json.y_max);
        console.log("degree",json.degree);
        var xmin=<HTMLInputElement>document.getElementById('xmin');
        var xmax=<HTMLInputElement>document.getElementById('xmax');
        var ymin=<HTMLInputElement>document.getElementById('ymin');
        var ymax=<HTMLInputElement>document.getElementById('ymax');
        var degree=<HTMLInputElement>document.getElementById('degree');
        xmin.value=json.x_min;
        xmax.value=json.x_max;
        ymin.value=json.y_min;
        ymax.value=json.y_max;
        degree.value=json.degree;
      }
      
      
    );





    console.log("setfanweiEnd");
  }
  downloadIamge() {//下载图片地址和图片名
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      let a = document.createElement("a"); // 生成一个a元素
      let event = new MouseEvent("click"); // 创建一个单击事件
      a.download = name || "photo"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = (<HTMLInputElement>document.getElementById('picurl')).value;
  }

}