import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryService } from '../../shared/services/country/country.service';
import { FakeService } from '../../shared/services/fake/fake.service';
import { FakeResponse } from '../../shared/interfaces/fake';
import { AnimationService } from '../../shared/services/animation/animation.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { ImageOpenComponent } from "../../modal/image-open/image-open.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageOpenComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  public items: FakeResponse[] = [];
  public selectedItem: FakeResponse | null = null;
  public map = '';
  public flag = '';
  public name = '';
  public countryID = '';
  public falePettition = ''


  constructor(private route: ActivatedRoute,
    private fakeService: FakeService,
    private countryService: CountryService,
    private animationService: AnimationService,
    private modalService: NgbModal,
  ) { }


  ngOnInit() {
    this.countryID = this.route.snapshot.queryParams['countryID'];
    this.getCountry();
    this.getFake();


  }

  getCountry() {
    this.countryService.getcountryById(this.countryID).subscribe((data: any) => {
      this.map = data.circuit;
      this.flag = data.flag;
      this.name = data.name;
      this.falePettition = data.petition
      console.log(data);

    })
  }

  getFake(): void {
    this.fakeService.getFakeByCountryID(this.countryID).subscribe((data: any) => {
      this.items = data as FakeResponse[];
      console.log(this.items);



      if (this.items.length > 0) {
        this.selectItem(this.items[0]); // Вибір першого елемента за замовчуванням
      }

    });
  }

  selectItem(item: FakeResponse): void {
    this.selectedItem = item;
  }

  // Відстежування події прокрутки вікна
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    this.animationService.applyParallaxEffect('.bg_image', scrollPosition);
  }

  //відкриття модального вікна для зображеня
  openModal(image: string) {
    if (window.innerWidth >= 780) {
      const modalRef = this.modalService.open(ImageOpenComponent);
      modalRef.componentInstance.imageSrc = image;
    } else {
      console.log('Модальне вікно не відкривається на екранах менших за 768 пікселів.');
    }
  }

}
