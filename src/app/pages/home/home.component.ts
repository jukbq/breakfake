import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AnimationService } from '../../shared/services/animation/animation.service';
import { Router, RouterLink } from '@angular/router';
import { CountryService } from '../../shared/services/country/country.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('textBlocks') textBlocksRef!: ElementRef<HTMLDivElement>;
  public countryArr: any[] = [];

  constructor(
    @Inject(DOCUMENT)
    private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private animationService: AnimationService,
    private countryService: CountryService
  ) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const title = document.querySelector('.title');
      this.animationService.applyTextEffect(title);
    };
    this.getCountry()
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any[]) => {
      this.countryArr = data;
      this.countryArr.sort((a, b) => a.name.localeCompare(b.name));

    });
  }

  onMouseEnter(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.tagName === 'path') {
      const className = Array.from(target.classList).join(' ');
      const matchingObject = this.countryArr.find(obj => obj.link === className);
      if (matchingObject) {
        this.highlightElementsByClass(className);
      } else {
        this.removeHighlightByClass('active');
      }
    }
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'path') {
      const className = Array.from(target.classList).join(' ');
      this.removeHighlightByClass('active');
    }
  }

  // Додає стиль для підсвічування всіх елементів з певним класом
  private highlightElementsByClass(className: string): void {
    const elements = this.document.querySelectorAll(`.${className}`);
    elements.forEach((element: HTMLElement) => {
      (element as HTMLElement).classList.add('active');
    });
  }

  // Видаляє стиль підсвічування з усіх елементів з певним класом
  private removeHighlightByClass(className: string): void {
    const elements = this.document.querySelectorAll(`.${className}`);
    elements.forEach((element: HTMLElement) => {
      (element as HTMLElement).classList.remove('active');
    });
  }

  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'path') {
      const classListArray = Array.from(target.classList);
      const filteredClassList = classListArray.filter(className => className !== 'active');
      const className = filteredClassList.join(' ');

      const matchingObject = this.countryArr.find(obj => obj.link === className);
      if (matchingObject) {
        this.openContry(matchingObject.id);
      }
    }
  }

  openContry(countryid: string): void {

    this.router.navigate(["/country"], {
      queryParams: { countryID: countryid },


    });
  }



  // Відстежування події прокрутки вікна
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    this.animationService.applyParallaxEffect('.bg_image', scrollPosition);
  }

}

