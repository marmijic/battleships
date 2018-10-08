import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('navbarContent') navbarContent: ElementRef;
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
  constructor(private router: Router) { }

  collapse(): void {
    this.navbarContent.nativeElement.style.display = 'block';
  }

  getActive(): string {
    return this.router.url;
  }

}
