import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Heroe } from '../model/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Heroe[] = [
      { id: 1, nombre: 'Superman', urlImg: 'https://fotografias.larazon.es/clipping/cmsimages02/2022/12/15/B756BC92-07BA-4CF9-B851-BF5BA7E65166/98.jpg?crop=1200,675,x0,y0&width=1900&height=1069&optimize=low&format=webply', razaHumana: true, fechaCreacion: new Date('1997-06-12'), identidad: 'Clark Kent' },
      { id: 2, nombre: 'Batman', urlImg: 'https://img2.rtve.es/i/?w=1600&i=1634549481092.jpg', razaHumana: true, fechaCreacion: new Date('1997-06-12'), identidad: 'Bruce Wayne' },
      { id: 3, nombre: 'Spiderman', urlImg: 'https://media.revistagq.com/photos/618955117701883d93085399/16:9/w_1280,c_limit/spider%20man.jpg', razaHumana: true, fechaCreacion: new Date('1997-06-12'), identidad: null }
    ];
    return { heroes };
  }
}
