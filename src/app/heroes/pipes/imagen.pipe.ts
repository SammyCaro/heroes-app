import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroes: Heroes): string {
    let id = heroes.id;
    return `assets/heroes/${id}.jpg`;
  }
}
