import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../model/heroe.model';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() heroe: Heroe ;

  ngOnInit(): void {
    console.log(this.heroe);
  }
}
