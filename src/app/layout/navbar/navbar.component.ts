import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  scrolled = false;

  constructor(private router: Router) {}

  ngOnInit() {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrolled = event.url === '/cart' || window.scrollY > 50;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50 || this.router.url === '/cart';
  }
}
