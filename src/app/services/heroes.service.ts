import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Heroe } from '../model/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private apiUrl = 'api/heroes';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Heroe[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Heroe> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Heroe>(url).pipe(
      catchError(this.handleError<Heroe>(`getHero id=${id}`))
    );
  }

  addHero(hero: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(this.apiUrl, hero).pipe(
      catchError(this.handleError<Heroe>('addHero'))
    );
  }

  updateHero(id: number, hero: Heroe): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, hero).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}