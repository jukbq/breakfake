import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CountryService } from '../../shared/services/country/country.service';
import { EventResponse } from '../../shared/interfaces/events';
import { EventsService } from '../../shared/services/events/events.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  public countryArr: Array<any> = [];
  public items: EventResponse[] = [];


  constructor(
    private countryService: CountryService,
    private eventsService: EventsService,
  ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getevents();

  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any) => {
      this.countryArr = data;
      this.countryArr.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onCountrySelect(event: any): void {
    const selectedCountry = event.target.value;
    this.getCoutryNews(selectedCountry);
  }

  getevents() {
    this.eventsService.getAll().subscribe((data: any) => {
      this.items = data

    })
  }

  getCoutryNews(country: any) {
    if (country == 'all') {
      this.getevents()
    } else {
      this.eventsService.getEventByCountryID(country).subscribe((data: any) => {
        this.items = data
      })
    }
  }
}
