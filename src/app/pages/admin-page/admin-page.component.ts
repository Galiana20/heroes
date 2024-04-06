import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../model/heroe.model';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
