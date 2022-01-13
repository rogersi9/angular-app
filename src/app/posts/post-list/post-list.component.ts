import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  selector: 'app-post-list'
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private subscription: Subscription[] = [];
  constructor(public postService: PostService){}

  ngOnInit(): void {
      this.postService.getPosts();
      const sub= this.postService.getPostUpdateListener().subscribe((posts: Post[])=>{
        this.posts = posts;
      });
      this.subscription.push(sub);
  }


  onDelete(id: string){
    console.log("Post Id To be deleted is: "+ id);

    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
      this.subscription.map((req)=>req.unsubscribe());
  }
}
