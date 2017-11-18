import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../login-service.service";
import {Data, Router} from "@angular/router";
import {BlogServiceService} from "../blog-service.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private login: LoginServiceService, private router : Router, private blogs: BlogServiceService) { }
  Users ;
  Blogs ;
  blogcat = 0;
  isadd: boolean = true;
  selectedBlog = {
    title: null,
    description: null,
    categoryId: null,
    author: null,
    authorName :null,
    date: null,
    id: null
  };
  blogTitle;
  blogDescription;
  blogcategoryId;
  fav: boolean = false;
  ngOnInit() {
    this.blogs.getData().subscribe((data)=>{
      this.Blogs = data;
    })
    this.login.getData().subscribe((data)=>{
      this.Users = data;
    })
    if(localStorage.getItem("isloggedin") == "false"){
      this.router.navigate(['login'])
    }
  }

  UserLogout(){
     localStorage.setItem("isloggedin","false");
     localStorage.removeItem("author");
    localStorage.removeItem("authorId");
    localStorage.removeItem("authorName")
     this.router.navigate(['login']);
  }


  addBlog(title, description, category){
     let blog = {
       title : title,
       description : description,
       author : localStorage.getItem("authorId"),
       authorName : localStorage.getItem("authorName"),
       categoryId : category,
       date : new Date().toLocaleDateString()
     }
     this.blogs.postData(blog).subscribe((data)=>{
       this.Blogs.push(data);
     })
  }

  updateBlog(title, description, category){
    this.selectedBlog.title = title;
    this.selectedBlog.description = description;
    this.selectedBlog.categoryId = category;
    this.selectedBlog.authorName = localStorage.getItem("authorName");

    this.blogs.updateData(this.selectedBlog,this.selectedBlog.id).subscribe((data)=>{
      this.blogs.getData().subscribe((data)=>{ this.Blogs = data;})
    })

  }

  isFavourite(id){

    for(var i =0; i < this.Users.length ;i++){
      if(this.Users[i].id == localStorage.getItem("authorId")){
        for(var j =0; j< this.Users[i].favourites.length;j++){
          if(this.Users[i].favourites[j] == id){
            this.fav = true;
            break;
          }
        }
      }
    }

    if(this.fav){
      this.fav = false;
      return true;
    }
    else {
      return false;
    }
  }

  markAsFovourite(favid){

    for(var j =0; j<this.Users.length;j++){
      if(this.Users[j].id == localStorage.getItem("authorId")){
        this.Users[j].favourites[this.Users[j].favourites.length] = favid;
        var updatedData ={
          username : this.Users[j].username,
          password : this.Users[j].password,
          favourites : this.Users[j].favourites
        }
         this.login.updateData(updatedData, this.Users[j].id).subscribe((data)=>{
           console.log(data);
         })
      }
    }
  }

  unmarkAsFovourite(favid){

    for(var j =0; j<this.Users.length;j++){
      if(this.Users[j].id == localStorage.getItem("authorId")){
        var index = this.Users[j].favourites.indexOf(favid,0);
        if(index > -1){
          this.Users[j].favourites.splice(index,1);
        }
        var updatedData ={
          username : this.Users[j].username,
          password : this.Users[j].password,
          favourites : this.Users[j].favourites
        }
        this.login.updateData(updatedData, this.Users[j].id).subscribe((data)=>{
          console.log(data);
        })
      }
    }
  }

  deleteBlog(id){
    this.blogs.deleteData(id).subscribe((data)=>{
      for(var i =0; i<this.Blogs.length; i++){
        if(this.Blogs[i].id == id ){
          this.Blogs.splice(i,1);

          for(var j =0;j<this.Users.length;j++){
            if(this.Users[j].id = localStorage.getItem("authorId")){
              var index = this.Users[j].favourites.indexOf(id,0);
              this.Users[j].favourites.splice(index,1);
            }
          }

          break;
        }
      }
    })
  }

  editBlog(blogToBeEdit){
    this.blogTitle = blogToBeEdit.title;
    this.blogDescription = blogToBeEdit.description;
    this.blogcategoryId= blogToBeEdit.categoryId;

    this.selectedBlog.author = blogToBeEdit.authorId;
    this.selectedBlog.date = new Date().toLocaleDateString();
    this.selectedBlog.id = blogToBeEdit.id;

    this.isadd = false;
  }

  validUser(id){
    if(localStorage.getItem("authorId") == id){
      return true;
    }
    else {
      return false;
    }
  }

  saveData(title, description, category){
    this.isadd ? this.addBlog(title, description, category) : this.updateBlog(title, description, category);
    this.isadd = true;
  }

  getCategory(value){
    this.blogcat = value;
  }

  showblog(blog){
    if(this.blogcat == -1){
      for(var i = 0; i < this.Users.length; i++){
        if(this.Users[i].id == localStorage.getItem("authorId")){
          console.log(this.Users[i].favourites.indexOf(blog.id,0));
          if(this.Users[i].favourites.indexOf(blog.id,0) > -1){
            return true;
          }
          else {
            return false;
          }
        }
      }
    }
    else {
      if(this.blogcat == 0){
        return true;
      }
      else {
        if(this.blogcat == blog.categoryId){
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

}
