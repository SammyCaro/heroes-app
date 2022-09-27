import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
})
export class HeroeTarjetaComponent implements OnInit {
  @Input() heroes!: Heroes;
  constructor() {}

  ngOnInit(): void {}
}
