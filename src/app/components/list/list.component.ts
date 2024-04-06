import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../model/heroe.model';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateFormComponent } from '../create-form/create-form.component';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  heroes: Heroe[];
  alertVisible = false;

  constructor(public dialog: MatDialog, private heroesService: HeroesService,private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.getHeroes();

  }
  addHeroe(): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      data: {},
      width: '400px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHeroes();
    });

  }

  updateHeroe(data: any): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      data: data,
      width: '400px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHeroes();
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
          });
      }
      this.getHeroes();
      this._snackBar.open('Se ha eliminado el heroe correctamente ');

    });
    
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
