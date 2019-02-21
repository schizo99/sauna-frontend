import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getTemps(): Observable<any> {
    return this.http.get(endpoint + 'temps').pipe(
      map(this.extractData));
  }

  getOneTemp(): Observable<any> {
    return this.http.get(endpoint + 'temp').pipe(
      map(this.extractData));
  }
  
  getTemp(id): Observable<any> {
    return this.http.get(endpoint + 'temps/' + id).pipe(
      map(this.extractData));
  }
  
  addTemp (product): Observable<any> {
    console.log(product);
    return this.http.post<any>(endpoint + 'temps', JSON.stringify(product), httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addTemp'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
