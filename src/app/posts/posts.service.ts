import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({providedIn: 'root'}) // instead of adding in providers in app module
export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map(postData =>{ // convert _id to id
        return postData.posts.map((post: any)=>{
          return{
            id: post._id,
            title: post.title,
            content: post.content
          }
        });
      }))
      .subscribe((res: any)=>{
        this.posts = res;
        this.postsUpdated.next(this.posts);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {id: '', title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((res)=>{
        console.log(res.message)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string){
    this.http.delete('http://localhost:3000/api/posts/'+id)
      .subscribe((res)=>{
        const updatedPosts = this.posts.filter(post => post.id != id);
        this.postsUpdated.next([...updatedPosts]); // delete post from front-end
      });
  }
}
