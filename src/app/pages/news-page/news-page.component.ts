import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../shared/services/events/events.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageOpenComponent } from '../../modal/image-open/image-open.component';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {
  public newsID = '';
  public name = '';
  public imagen = '';
  public description = '';
  public link = '';

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private nwsServis: EventsService
  ) { };

  ngOnInit() {
    this.newsID = this.route.snapshot.queryParams['newsID'];
    this.getNews()
  };


  getNews() {
    this.nwsServis.geteventById(this.newsID).subscribe((data: any) => {
      this.name = data.namen
      this.imagen = data.imagen
      this.description = data.description
      this.link = data.link


    })
  }



  //відкриття модального вікна для зображеня
  openModal(image: string) {
    const modalRef = this.modalService.open(ImageOpenComponent);
    modalRef.componentInstance.imageSrc = image;

  }

}
