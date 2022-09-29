import { Heroes } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroes[]> {
    const url = `${this.baseUrl}/heroes`;
    return this.http.get<Heroes[]>(url);
  }

  getHeroesById(id: string): Observable<Heroes> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.get<Heroes>(url);
  }
}
