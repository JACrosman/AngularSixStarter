import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

/**
 * Service - ApiService
 *
 * Handles all HTTP server communication
 */
@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient
  ) {

  }

  /**
   * Get default headers for a request
   */
  get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  /**
   * Handle http errors
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

        return throwError(error.error.message);
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  /**
   * Make an HTTP GET request
   * @param path
   * @param params
   */
  get(path: string): Observable<any> {
    return this.http
      .get<any>(`${environment.api_url}${path}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Make an HTTP PUT request
   * @param path
   * @param body
   */
  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put<any>(`${environment.api_url}${path}`, JSON.stringify(body), { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Make an HTTP POST request
   * @param path
   * @param body
   */
  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post<any>(`${environment.api_url}${path}`, JSON.stringify(body), { headers: this.headers }
    )
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Make an HTTP DELETE request
   * @param path
   */
  delete(path: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.api_url}${path}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Make an HTTP POST request to upload a list of files
   * @param path
   */
  uploadFile(path: string, name: string, files: FileList): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(name, files[0], files[0].name);

    return this.http
      .post<any>(`${environment.api_url}${path}`, formData, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
