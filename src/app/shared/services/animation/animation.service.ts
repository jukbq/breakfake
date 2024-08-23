import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observer: IntersectionObserver | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  applyParallaxEffect(selector: string, scrollPosition: number) {
    const bgImage = document.querySelector(selector) as HTMLElement;
    const parallaxValue = scrollPosition * 0.5;
    bgImage.style.transform = `translateY(${parallaxValue}px)`;
  }

  applyTextEffect(target: any) {
    console.log(target);

    let thresholdValue;
    const callback = () => {
      if (target.className == 'title') {
        thresholdValue = 1;
        target.style.opacity = '1';
        target.style.left = '0%';
        const line = target.querySelector('.line') as HTMLElement;
        if (line) {
          setTimeout(() => {
            line.style.width = '100%';
          }, 150);
        }
      }

      /*   if (target.className == 'dishes_list') {
          thresholdValue = 0.5;
          const dishesCards = target.querySelectorAll('.dishes_card');
          dishesCards.forEach((dishesCard: HTMLElement) => {
            dishesCard.style.opacity = '1';
            dishesCard.style.marginTop = '0px';
          });
        }
        if (target.className == 'recipe_image') {
          thresholdValue = 1;
          target.style.opacity = '1';
          target.style.left = '0px';
        }
        if (target.className == 'recipe_title') {
          thresholdValue = 1;
          target.style.opacity = '1';
          target.style.left = '36%';
        } */
    };

    const options = {
      threshold: thresholdValue, // 1 – полная видимость элемента, 0.5 – половина и т.д.
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
  }
}
