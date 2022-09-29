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
  heroeSeleccionado: Heroes | undefined;
  sinHeroe!: boolean;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => {
        this.heroes = heroes;
        if (heroes.length > 0 && this.termino != '') {
          this.sinHeroe = false;
        } else {
          this.sinHeroe = true;
        }
        //devuelve array vacio si el termino es cualquier cosa
        console.log(this.heroes);
      });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      //si lo que llega es undefined se hace el return para que no lance error
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroes = event.option.value;
    this.termino = heroe.superhero;
    console.log(heroe);
    this.heroesService.getHeroesById(heroe.id!).subscribe((heroes) => {
      this.heroeSeleccionado = heroes;
    });
  }
}
