import { Component } from '@angular/core';
import { AboutService } from '../../shared/services/about/about.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.scss'
})
export class AboutProjectComponent {
  public about: any = [];
  public image = ''
  public description = ''

  constructor(
    private aboutSevice: AboutService
  ) { }

  ngOnInit(): void {
    this.getAbout()

  }

  getAbout(): void {
    this.aboutSevice.getAbout().subscribe((data: any) => {

      if (data.length > 0) {
        this.image = data[0].imageAbout
        this.description = data[0].description
      } else {
        console.log('Дані відсутні');
      }



    })
  }
}
