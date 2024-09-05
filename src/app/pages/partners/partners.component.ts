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
  public partnersArr: Array<any> = [];
  public items: any = [];
  public image = ''
  public description = ''

  constructor(
    private partnersService: PartnersService,
  ) { }

  ngOnInit(): void {
    this.getPartners()

  }

  // Отримання даних з сервера
  getPartners(): void {
    this.partnersService.getAll().subscribe((data: any) => {
      this.partnersArr = data as [];
      this.partnersArr.sort((a, b) => a.posithion - b.posithion);
      console.log(this.partnersArr);

    });
  }



}
