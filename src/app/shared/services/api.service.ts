import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TagInterface } from '../types/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3004'

  getTags(): Observable<TagInterface[]> {
    return this.http.get<TagInterface[]>(`${this.apiUrl}/tags` );
  }

  createTag(name: string): Observable<TagInterface> {
    return this.http.post<TagInterface>(`${this.apiUrl}/tags`, { name });
  }
}
