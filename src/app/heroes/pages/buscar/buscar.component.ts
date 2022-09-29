import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroes[] = [];
  heroeSeleccionado!: Heroes;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService.getSugerencias(this.termino).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroes = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesById(heroe.id!).subscribe((heroes) => {
      this.heroeSeleccionado = heroes;
      console.log(this.heroeSeleccionado);
    });
  }
}
