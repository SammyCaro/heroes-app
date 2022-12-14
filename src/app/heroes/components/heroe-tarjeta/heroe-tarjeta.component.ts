import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent implements OnInit {
  @Input() heroes!: Heroes;
  heroeCharacters!: string[];
  constructor() {}

  ngOnInit(): void {
    this.heroeCharacters = this.heroes.characters.split(', ');
  }
}
