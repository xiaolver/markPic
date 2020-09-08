import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { RouterState } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

import { GetScopeService } from '../tag-pic-service/get-scope.service';
import { getJSON } from 'jquery';
import { stringify } from '@angular/compiler/src/util';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tag-pic',
  templateUrl: './tag-pic.component.html',
  styleUrls: ['./tag-pic.component.css'],
})
export class TagPicComponent implements OnInit {
  @ViewChild('uploadInput', { static: true })
  private readonly uploadInputRef: ElementRef<HTMLInputElement>;
  @ViewChildren('pic')
  private readonly picsRef: QueryList<ElementRef<HTMLImageElement>>;
  @ViewChildren('canvasshowpic')
  private readonly canvasshowpicsRef: QueryList<ElementRef<HTMLCanvasElement>>;
  @ViewChildren('canvasclip')
  private readonly canvasclipsRef: QueryList<ElementRef<HTMLCanvasElement>>;
  model: {
    picurl: string;
    crane: string;
    lane: string;
    video: string;
    lorr: string;
    degree: string;
    xmin: string;
    xmax: string;
    ymin: string;
    ymax: string;
    imgurls: object[];
    exporttext:string;
  };
  ngOnInit(): void {
    // this.setfanwei();
  }

  constructor(
    private getscope: GetScopeService,
    private sanitizer: DomSanitizer
  ) {
    this.model = {
      picurl:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599028409376&di=e4b60287b48c4f364045bbd99649e747&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg',
      crane: '',
      lane: '',
      video: '',
      lorr: '',
      degree: '',
      xmin: '',
      xmax: '',
      ymin: '',
      ymax: '',
      imgurls: [],
      exporttext: '',
    };
    console.log('come in constructor');
    console.log(this.getscope);
    console.log(this);
  }
  getImgbyHttp(): void {
    console.log('getImg by http start');
    this.model.imgurls = [
      this.sanitizer.bypassSecurityTrustUrl(this.model.picurl),
    ];
  }
  getImgbyPath(): void {
    console.log('getImg by path start');
    const inputFile = this.uploadInputRef.nativeElement.files;
    console.log('inputFile.length', inputFile.length);
    this.model.imgurls = [].map.call(inputFile, (file) =>
      this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
    );
  }
  clip(): void {
    console.log('clip start ');
    const picRefs = this.picsRef.toArray();
    const piccanvasRefs = this.canvasshowpicsRef.toArray();
    const canvasclipRefs = this.canvasclipsRef.toArray();
    for (let i = 0; i < picRefs.length; i++) {
      const image = picRefs[i].nativeElement;

      const piccanvas = piccanvasRefs[i].nativeElement;
      const canvas = canvasclipRefs[i].nativeElement;
      // tslint:disable: variable-name
      const x_min = Number(this.model.xmin);
      const x_max = Number(this.model.xmax);
      const y_min = Number(this.model.ymin);
      const y_max = Number(this.model.ymax);
      const angle = Number(this.model.degree);
      const xcenter = Number(-x_min + x_max);
      const ycenter = Number(-y_min + y_max);
      console.log('x_min x_max y_min y_max angle');
      console.log(x_min, y_min, x_max, y_max, angle);

      // 画标注图
      const ctxpic = piccanvas.getContext('2d');
      // image.onload=function(){
      console.log('onloadfunction执行');
      console.log('imageWid imageHeight', image.width, image.height);
      piccanvas.width = image.width;
      piccanvas.height = image.height;
      console.log(
        'piccanvaswid piccanvasheight',
        piccanvas.width,
        piccanvas.height
      );

      ctxpic.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        image.width,
        image.height
      );
      // }
      // 画裁剪后的图片
      // image.onload=function(){
      const angleRad = ((((angle % 360) + 360) % 360) * Math.PI) / 180;
      const sin = Math.sin(angleRad);
      const cos = Math.cos(angleRad);
      canvas.width = xcenter * Math.abs(cos) + ycenter * Math.abs(sin);
      canvas.height = xcenter * Math.abs(sin) + ycenter * Math.abs(cos);
      const ctx = canvas.getContext('2d');
      if (angleRad <= Math.PI / 2) {
        ctx.translate(ycenter * sin, 0);
      } else if (angleRad <= Math.PI) {
        ctx.translate(canvas.width, ycenter * -cos);
      } else if (angleRad <= (Math.PI * 3) / 2) {
        ctx.translate(xcenter * -sin, canvas.height);
      } else {
        ctx.translate(0, xcenter * cos);
      }
      ctx.rotate(angleRad);
      ctx.drawImage(
        piccanvas,
        x_min,
        y_min,
        xcenter,
        ycenter,
        0,
        0,
        xcenter,
        ycenter
      );
      // 在标注图上画框，应该在画裁剪旋转图后，否则裁剪旋转图上会有边框
      ctxpic.rect(x_min, y_min, x_max - x_min, y_max - y_min);
      ctxpic.stroke();

      //
      this.model.exporttext=JSON.stringify
      
      (
        {
                  "qc"  :this.model.crane,
                  "lane":this.model.lane,
                  "video":this.model.video,
                  "degree": this.model.degree,
                  "x_min": this.model.xmin,
                  "x_max": this.model.xmax,
                  "y_min": this.model.ymin,
                  "y_max": this.model.ymax
                
                
              
            
          
          }
      );
      // ctx.drawImage(image,0,0,image.width,image.height,0,0,image.width,image.height);
      // c
      //

      // }
      // var imgData=ctx.getImageData(Number(x_min),Number(y_min),Number(x_max),Number(y_max));
      // ctx.putImageData(imgData,0,0);
    }
  }
  setfanwei(): void {
    console.log('setfanweiStart');

    console.log('crane,lane', this.model.crane, this.model.lane);
    if (this.model.lorr === 'right') {
      this.model.lane = String(Number(this.model.lane) + 10);
    }
    console.log(this);
    console.log('getscope', this.getscope);
    var mod=this.model;
    this.getscope
      .getScope(this.model.crane, this.model.lane)
      .subscribe(function (data): void {
        this.datae = data;
        console.log('data', data);
        console.log(typeof data);
        const str = JSON.stringify(data);
        console.log('str ', str, typeof str);
        let json = JSON.parse(str).info;
        const svideo = 'video' + mod.video;
        console.log('json', json[svideo]);
        json = json[svideo];
        console.log('xmin', json.x_min);
        console.log('xmax', json.x_max);
        console.log('ymin', json.y_min);
        console.log('ymax', json.y_max);
        console.log('degree', json.degree);
        mod.xmin = json.x_min;
        mod.xmax = json.x_max;
        mod.ymin = json.y_min;
        mod.ymax = json.y_max;
        mod.degree = json.degree;
      });

    console.log('setfanweiEnd');
  }
  downloadImage(): void {
    // 下载图片地址和图片名
    const image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = (): void => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);
      const url = canvas.toDataURL('image/png'); // 得到图片的base64编码数据
      const a = document.createElement('a'); // 生成一个a元素
      const event = new MouseEvent('click'); // 创建一个单击事件
      a.download = name || 'photo'; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = this.model.picurl;
  }
  
}
