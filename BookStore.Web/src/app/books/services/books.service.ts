import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../store/book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllBooks(){
    return this.http.get<Book[]>(this.url + "books");
  }
}
