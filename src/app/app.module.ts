import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HttpClient} from '@angular/common/http'

import {Route,Router,ActivatedRoute,Params} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagPicComponent } from './tag-pic/tag-pic.component';
import {GetScopeService} from './tag-pic-service/get-scope.service';

@NgModule({
  declarations: [
    AppComponent,
    TagPicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [GetScopeService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
