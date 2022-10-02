import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  heroe: Heroes = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  save() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    this.heroesService.addHero(this.heroe).subscribe((heroe) => {
      console.log('Respuesta', heroe);
    });

    this.heroe = {
      superhero: '',
      publisher: Publisher.DCComics,
      alter_ego: '',
      first_appearance: '',
      characters: '',
      alt_img: '',
    };
  }
}
