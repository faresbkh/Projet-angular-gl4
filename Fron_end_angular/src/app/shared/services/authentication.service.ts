import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';


export interface UserDetails {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
  power: number;

}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  firstName?: string;

}

const API_URL = environment.apiUrl;

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {

  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {

    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public isMaster(): boolean {
    const user = this.getUserDetails();
    if (user && user.power === 0) {
      return true;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login' | '' | 'me' | 'admins', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      console.log(JSON.stringify(user));
      console.log(API_URL + '/users/' + type, user);
      base = this.http.post(API_URL + '/users/' + type, user);
    } else {
      base = this.http.get(API_URL + '/users/' + type, {headers: {Authorization: `Bearer ${this.getToken()}`}});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', '', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'me');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getAll(): Observable<any> {
    return this.request('get', 'admins');
  }


}
