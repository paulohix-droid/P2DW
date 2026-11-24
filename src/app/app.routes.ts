import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DetalheComponent } from './pages/home/detalhe/detalhe';
import { CestaComponent } from './pages/home/cesta/cesta';
import { BuscaComponent } from './pages/home/busca/busca';
import { EsqueciSenhaComponent } from './pages/home/esqueci-senha/esqueci-senha';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhe', component: DetalheComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent }
];
