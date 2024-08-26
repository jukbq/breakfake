import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { PartnersService } from '../../shared/services/partners/partners.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  public about: any = [];
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
      console.log(data);




    })
  }



}
