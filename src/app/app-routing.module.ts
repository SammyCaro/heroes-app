import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* componentes */
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    /* este será el path para las rutas hijas de este módulo */
    path: 'auth',
    /* carga los componentes del authModule de manera perezosa */
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((module) => module.HeroesModule),
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
    //component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
