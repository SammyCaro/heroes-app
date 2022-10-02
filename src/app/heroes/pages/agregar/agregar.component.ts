import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  showConfirmation = false;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroesById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  save() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    /* ESTO ES PARA SABER SI TIENE UN ID QUIERE DECIR QUE SE VA A EDITAR, SI NO TIENE SE VA A CREAR UN HEROE */
    if (this.heroe.id) {
      this.heroesService
        .updateHero(this.heroe)
        .subscribe((heroe) => console.log('Heroe actualizado', heroe));
    } else {
      this.heroesService.addHero(this.heroe).subscribe((heroe) => {
        console.log('Respuesta', heroe);
        this.showConfirmation = true;
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }

    /* clear inputs */
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
