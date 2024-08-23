import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
      const navbarCollapse = document.querySelector(
        '.navbar-collapse'
      ) as HTMLElement;
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
      }
    });
  }
}
