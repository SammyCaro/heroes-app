import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false,
})
export class ImagenPipe implements PipeTransform {
  transform(heroes: Heroes): string {
    /* si no tiene id o alt imagen, se muestra la foto por defecto */
    if (
      !heroes.id?.includes('marvel') &&
      !heroes.id?.includes('dc') &&
      !heroes.alt_img
    ) {
      return `assets/no-image.png`;
      /* si tiene id e imagen se muestra la que se subió como url */
    } else if (heroes.alt_img) {
      return heroes.alt_img;
      /* si no es ninguna de las opciones quiere decir que es la imagen de la data que venía por defecto en la API */
    } else {
      return `assets/heroes/${heroes.id}.jpg`;
    }
  }
}
