import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConspiraciesComponent } from './conspiracies/conspiracies.component';
import { ConspiracyEditComponent } from './conspiracies/conspiracy-edit/conspiracy-edit.component';
import { ConspiracyDetailsComponent } from './conspiracies/conspiracy-details/conspiracy-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/conspiracies', pathMatch: 'full' },
    {
        path: 'conspiracies', component: ConspiraciesComponent, children: [
            { path: 'new', component: ConspiracyEditComponent },
            { path: ':id', component: ConspiracyDetailsComponent },
            { path: ':id/edit', component: ConspiracyEditComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
