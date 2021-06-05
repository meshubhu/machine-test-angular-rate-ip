import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayDataComponent } from './display-data/display-data.component';
import { InputFormComponent } from './input-form/input-form.component';

const routes: Routes = [
  {
    path: '',
    component: InputFormComponent,
    redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'data',
    component: DisplayDataComponent
  },
  {
    path: '**', component: InputFormComponent,redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
