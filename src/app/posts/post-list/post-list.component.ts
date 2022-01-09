import { Component } from "@angular/core";

@Component({
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  selector: 'app-post-list'
})
export class PostListComponent{
posts: any[] = [
  {title: 'First Post', content: 'This is my first post'},
  {title: 'Second Post', content: 'This is my second post'},
]
}
