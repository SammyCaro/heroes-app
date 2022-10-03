import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    /* Si no estamos en la pantalla GUARDAR se hace return vacío para no cargue datos que no existen */
    if (!this.router.url.includes('editar')) {
      return;
    }
    /* Si estamos en pantalla editar carga los datos*/
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
      this.heroesService.updateHero(this.heroe).subscribe((heroe) => {
        this.showSnackBar('Registro actualizado');
      });
    } else {
      this.heroesService.addHero(this.heroe).subscribe((heroe) => {
        console.log('Respuesta', heroe);
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.showSnackBar('Registro creado');
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

  remove() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Hecho!', {
      duration: 2500,
    });
  }
}
