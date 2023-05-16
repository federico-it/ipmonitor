import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken(token: string): any {
    return jwt.decode(token);
  }

  getDecodedTokenValue(token: string, key: string): any {
    const decodedToken: any = jwt.decode(token);
    return decodedToken[key];
  }
}
