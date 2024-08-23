import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { AnimationService } from '../../shared/services/animation/animation.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('textBlocks') textBlocksRef!: ElementRef<HTMLDivElement>;


  constructor(
    @Inject(DOCUMENT)
    private document: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private animationService: AnimationService,

  ) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const title = document.querySelector('.title');
      this.animationService.applyTextEffect(title);



    };

  }

  open_country(country: any) {
    console.log(country);
  }

  onMouseOver(coutry: string): void {

    console.log(coutry);

    /*     if (element) {
          const countryId = element.id;
          console.log('Hovered country ID:', countryId);
          // Виконайте необхідні дії тут
        }  */
  }
}
