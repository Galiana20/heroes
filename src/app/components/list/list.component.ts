import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../model/heroe.model';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateFormComponent } from '../create-form/create-form.component';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule,FormsModule,MatInputModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  heroes: Heroe[];
  alertVisible = false;
  filtroNombre: string = '';

  constructor(public dialog: MatDialog, private heroesService: HeroesService,private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.getHeroes();

  }

  filtrarHeroes() {
    return this.heroes.filter(heroe =>
      heroe.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
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
      this._snackBar.open('Se ha eliminado el heroe correctamente ',"X",{duration: 3000});

    });
    
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
