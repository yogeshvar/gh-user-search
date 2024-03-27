import { Injectable } from '@angular/core';
import { SearchResults, User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http: HttpClient;
  private headers: any = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${environment.github_token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllUsers(q = 'yogeshvar'): Observable<SearchResults> {
    return this.http.get<SearchResults>(
      `https://api.github.com/search/users?q=${q}`,
      {
        headers: this.headers,
      }
    );
  }

  getUserDetails(username: string): Observable<User> {
    return this.http.get<User>(`https://api.github.com/users/${username}`, {
      headers: this.headers,
    });
  }
}
