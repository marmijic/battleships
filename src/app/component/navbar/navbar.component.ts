import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../models/navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [``]
})
export class NavbarComponent {
  showNavbar: boolean;
  navItems: Array<Navbar> = [
    {
      name: 'Players',
      link: 'players'
    },
    {
      name: 'Create game',
      link: 'game-create'
    }
  ];
  constructor(private router: Router) {
    this.checkWindowSize();
  }

  @HostListener('window:resize') onResize() {
    this.checkWindowSize();
  }

  collapse(): void {
    this.showNavbar = !this.showNavbar;
  }

  getActive(): string {
    return this.router.url;
  }

  navClick(): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    const bodyWidth = document.getElementsByTagName('body')[0].offsetWidth;
    if (bodyWidth > 991) {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
  }

}
