import { Injectable } from '@angular/core';
import {Observable} from 'RXJS'
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Todo} from '../models/Todo'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos'
  todosLimit = '?_limit=10'
  // todosUrl: string = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

  constructor(private http:HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`)
  }

  toggleCompleted(todo: Todo): Observable<any>{
    const url = `${this.todosUrl}/${todo.id}` 
    return this.http.put(url, todo, httpOptions)
  }
  
  deleteTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}` 
    return this.http.delete<Todo>(url, httpOptions)
  }
}
