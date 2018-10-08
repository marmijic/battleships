import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showNavbar: boolean = false;
  navItems: Array<any> = [
    {
      name: 'Home',
      link: ''
    },
    {
      name: 'Players',
      link: 'players'
    },
    {
      name: 'Create game',
      link: 'game-create'
    }
  ]
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
    this.checkWindowSize()
  }

  private checkWindowSize(): void {
    const bodyWidth = document.getElementsByTagName('body')[0].offsetWidth;
    if (bodyWidth > 991) {
      this.showNavbar = true;
    }
    else {
      this.showNavbar = false;
    }
  }


}
