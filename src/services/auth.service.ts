import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelperService = new JwtHelperService();
    
    constructor(public http: HttpClient, public storage: StorageService){

    }

    authenticate(creds: CredenciaisDTO){
      return  this.http.post(
                                `${API_CONFIG.baseUrl}/login`,
                                creds,
                                {
                                    observe: 'response',
                                    responseType: 'text'
                                }
                            )
    }

    successfulLogin(authorizationValue: string){

        let tokn = authorizationValue.substring(7);
        let email = this.jwtHelper.decodeToken(tokn).sub;
        let user: LocalUser = {
            token: tokn,
            email: email
        };

        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}