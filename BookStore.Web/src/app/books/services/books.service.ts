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

  saveBook(payload: Book){
    return this.http.post<Book>(this.url + "books", payload);
  }

  updateBook(payload: Book){
    return this.http.put<Book>(`http://localhost:3000/books/${payload.id}`, payload);
  }

  deleteBook(id: number){
    return this.http.delete<Book>(`http://localhost:3000/books/${id}`);
  }
}
