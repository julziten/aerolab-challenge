import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserData } from './user.interface';
import { Product } from './product.interface';


interface ApiResponse {
  results: Array<any>;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM5NWIwNjIzMWI5ZTAwNmQ5ZTg1MTciLCJpYXQiOjE1ODA4MTcxNTh9.CJA8scJ6vjtoWqrK2jaa1T338EXtKhuKcKTPP-OtEWU';
  private apiUrl = 'https://coding-challenge-api.aerolab.co';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    })
  };

  public userDataService = {};

  constructor(private http: HttpClient) { }

  public fetchUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/user/me`, this.httpOptions);
  }

  public fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, this.httpOptions);
  }

}
