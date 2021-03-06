import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoriaService: CategoriaService) {

  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(
      res => {
      this.items = res;
    }, 
      error => {}
    );
  }

}
