import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getSelectedPosts(param){
    return this.http.get<Post[]>('http://localhost:3000/api/feed'+ param);
  }
}
