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
    const parallaxValue = scrollPosition * 0.01;
    bgImage.style.transform = `translateY(${parallaxValue}px)`;
  }

  applyTextEffect(target: any) {
    let thresholdValue;
    const callback = (entries: IntersectionObserverEntry[]) => {
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

    };

    const options = {
      threshold: thresholdValue, // 1 – полная видимость элемента, 0.5 – половина и т.д.
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
  }





}
