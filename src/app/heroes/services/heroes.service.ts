import { Heroes } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroes[]> {
    const url = `http://localhost:3000/heroes`;
    return this.http.get<Heroes[]>(url);
  }

  getHeroesById(id: string): Observable<Heroes[]> {
    const url = `http://localhost:3000/heroes/${id}`;
    return this.http.get<Heroes[]>(url);
  }
}
