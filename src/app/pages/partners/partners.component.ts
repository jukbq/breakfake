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
  public partnerArr: PartnersResponse[] = [];
  public items: any = [];
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
      this.partnerArr = data as PartnersResponse[];
      this.partnerArr.sort((a, b) => a.posithion - b.posithion)
      /*    this.partnerSort() */
    })

  }

  /*   partnerSort() {
      this.items = this.partnerArr
  
    } */


}
