import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: "",
  };

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public auth: AuthService) {

  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(res => {
      this.auth.successfulLogin(res.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {})
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }
}
