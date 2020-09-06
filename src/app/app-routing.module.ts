import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagPicComponent } from './tag-pic/tag-pic.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"tagpic",
    pathMatch:"full",
  }
  ,
  {
    path:"tagpic",
    component:TagPicComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
