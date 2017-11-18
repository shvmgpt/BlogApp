import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './my-blog/login/login.component';

import {LoginServiceService} from "./my-blog/login-service.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { RouterModule} from "@angular/router";
import {BlogComponent} from "./my-blog/blog/blog.component";
import {BlogServiceService} from "./my-blog/blog-service.service";
import { NavBarComponent } from './my-blog/nav-bar/nav-bar.component';
import { FooterComponent } from './my-blog/footer/footer.component';


const appRoutes = [
  {path : '', redirectTo:'/login', pathMatch : 'full' },
  {path : 'login', component  : LoginComponent},
  {path : 'blogs' , component : BlogComponent},
  {path : '**', component : LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginServiceService, BlogServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
