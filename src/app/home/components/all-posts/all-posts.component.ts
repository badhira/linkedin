import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post } from '../../models/Post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
 @ViewChild(IonInfiniteScroll)infiniteScroll: IonInfiniteScroll;

 queryParam: string;
 allLoadedPosts: Post[]=[];
numberOfPosts=5;
skipPosts=0;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.getPosts(false, '')
  }

  getPosts(isInitialLoad: boolean, event){
    if(this.skipPosts ===20){
    event.target.disabled = true;
    }
    this.queryParam = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;

 this.postService.getSelectedPosts(this.queryParam).subscribe((posts: Post[])=>{
  for (let post =0; post < posts.length; post++){
  this.allLoadedPosts.push(posts[post]);
}
if(isInitialLoad) event.target.complete();
this.skipPosts=this.skipPosts + 5;
 },(error)=>{
  console.log(error);
 });
  }
loadData(event){
this.getPosts(true, event);
}
}
