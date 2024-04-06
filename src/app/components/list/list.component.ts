import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../model/heroe.model';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateFormComponent } from '../create-form/create-form.component';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  heroes: Heroe[];

  constructor(public dialog: MatDialog, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
    console.log(this.heroes);
  }
  addHeroe(): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      data: {},
      width: '400px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.heroes);
      this.getHeroes();
      console.log(this.heroes);

    });

  }

  updateHeroe(data: any): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      data: data,
      width: '400px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.heroes);
      this.getHeroes();
      console.log(this.heroes);

    });

  }


  deleteHero(hero: Heroe): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { message: '¿Estás seguro de que quieres eliminar este héroe?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(hero.id)
          .subscribe(() => {
            // Aquí podrías realizar alguna acción después de eliminar el héroe, por ejemplo, cerrar el diálogo
            console.log(hero);
          });
      }
      this.getHeroes();
    });
    
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
