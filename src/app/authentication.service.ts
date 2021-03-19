import { Inject,Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user';
import {RestaurantService} from './restaurant.service';
import { Authresponse } from './authresponse';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public jwtHelper: JwtHelperService,@Inject(BROWSER_STORAGE) private storage: Storage,private restaurantService: RestaurantService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('restaurant-token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  public getCurrentUserEmail(): string {
    const token = localStorage.getItem('restaurant-token');
    const tokenPayload = decode(token);  
    return tokenPayload.sub;
  }

  getRole():string{
    const token = localStorage.getItem('restaurant-token');
    const tokenPayload = decode(token);  
    return tokenPayload.scopes;
  }
  public saveToken(token: string): void {
    this.storage.setItem('restaurant-token', token);
  }
  public logout(): void {
    this.storage.removeItem('restaurant-token');
  }

  public login(user: User): Promise<any> {
    return this.restaurantService.login(user)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }
}
