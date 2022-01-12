import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject} from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'}) // instead of adding in providers in app module
export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((res: any)=>{
        this.posts = res.posts;
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
}
