import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutProjectComponent } from './pages/about-project/about-project.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { EventsComponent } from './pages/events/events.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddPartnerComponent } from './admin/add-partner/add-partner.component';
import { AddEventsComponent } from './admin/add-events/add-events.component';
import { AddAbutComponent } from './admin/add-abut/add-abut.component';
import { AddFakeComponent } from './admin/add-fake/add-fake.component';
import { AddCountryComponent } from './admin/add-country/add-country.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-project', component: AboutProjectComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AddCountryComponent, pathMatch: 'full' },
      { path: 'country', component: AddCountryComponent },
      { path: 'fake', component: AddFakeComponent },
      { path: 'about', component: AddAbutComponent },
      { path: 'partners', component: AddPartnerComponent },
      { path: 'events', component: AddEventsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
