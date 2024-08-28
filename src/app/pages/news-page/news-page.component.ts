import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../shared/services/events/events.service';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {
  public newsID = '';
  public name = '';

  constructor(
    private route: ActivatedRoute,
    private nwsServis: EventsService
  ) { };

  ngOnInit() {
    this.newsID = this.route.snapshot.queryParams['newsID'];
    console.log(this.newsID);
    this.getNews()
  };


  getNews() {
    this.nwsServis.geteventById(this.newsID).subscribe((data: any) => {
      this.name = data.namen

      console.log(this.name)



    })
  }


}
