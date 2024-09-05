import { Component } from '@angular/core';

import { PartnersService } from '../../shared/services/partners/partners.service';
import { CommonModule } from '@angular/common';
import { PartnersResponse } from '../../shared/interfaces/partners';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  public items: PartnersResponse[] = [];
  public image = ''
  public description = ''

  constructor(
    private aboutSevice: PartnersService
  ) { }

  ngOnInit(): void {
    this.getPartnert()

  }

  getPartnert(): void {
    this.aboutSevice.getAll().subscribe((data: any) => {
      const part = data;
      part.sort((a: { posithion: number; }, b: { posithion: number; }) => a.posithion - b.posithion)
      console.log(part);
      this.items = part;

    })
  }



}
