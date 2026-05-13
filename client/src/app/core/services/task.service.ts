import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiUrl = 'https://localhost:7089/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    console.log('SEND TO API:', task);
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<void> {
  return this.http.put<void>(
    `${this.apiUrl}/${task.id}`,
    task
    );
  }

  updateTaskStatus(id: string, status: number){
    return this.http.patch<void>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteAllTasks() {
  return this.http.delete('https://localhost:7089/api/tasks');
  }
}