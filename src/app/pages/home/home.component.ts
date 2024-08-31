import { DOCUMENT, isPlatformBrowser, PlatformLocation } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AnimationService } from '../../shared/services/animation/animation.service';
import { Router, RouterLink } from '@angular/router';
import { CountryService } from '../../shared/services/country/country.service';
import { Meta } from '@angular/platform-browser';



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
  public metaName = 'BrakeTheFake - Anti-fakes and propaganda initiative';
  public metaDescription = 'BrakeTheFake is a platform that joins forces in the fight against disinformation and propaganda. Learn more about the media resources that spread fake news and join the initiative to block them.';
  public autor = 'BrakeTheFake';
  public metaImage = '../../../assets/image/logo.png';
  public currentURL = this.platformLocation.href;



  constructor(
    @Inject(DOCUMENT)
    private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private animationService: AnimationService,
    private countryService: CountryService,
    private platformLocation: PlatformLocation,
    private meta: Meta


  ) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const title = document.querySelector('.title');
      this.animationService.applyTextEffect(title);
    };

    //metatags
    this.meta.updateTag({ name: 'title', content: this.metaName });
    this.meta.updateTag({ name: 'description', content: this.metaDescription });
    this.meta.updateTag({ name: 'author', content: this.autor });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });

    //op metatags
    /*     this.meta.updateTag({ property: 'fb:app_id', content: '433617998637385' }); */
    this.meta.updateTag({ property: 'fb:url', content: this.currentURL });
    this.meta.updateTag({ property: 'og:title', content: this.metaName });
    this.meta.updateTag({ property: 'og:description', content: this.metaDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: this.metaImage });

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

