import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent{
  enteredTitle: string = 'Title';
  enteredContent: string = 'Content';

  constructor(public postService: PostService){}


  onAddPost(form: NgForm): void{
    if(form.invalid) return;
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    }
    this.postService.addPost(post.title, post.content);
    form.resetForm();
  }
}
