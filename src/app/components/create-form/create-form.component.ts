import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCheckboxModule,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private heroesService: HeroesService
  ) { }

  update = false;

  ngOnInit(): void {
    if (this.data.nombre) {
      let fechaCompleta = "1997-06-12T00:00:00.000Z";
      let fecha = new Date(fechaCompleta);
      this.data.fechaCreacion = fecha.toISOString().split('T')[0];

      this.update = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  addHero(): void {
    console.log(this.data);
    this.data.nombre = this.data.nombre.trim();
    if (!this.data.nombre || !this.data.urlImg || !this.data.fechaCreacion || !this.data.identidad) { return; }
    this.heroesService.addHero(this.data)
      .subscribe(hero => {
        this.dialogRef.close(hero);
      });
  }

  updateHero(): void {
    this.heroesService.updateHero(this.data.id, this.data)
      .subscribe(() => {
        this.dialogRef.close(this.data);
      });
  }

}
