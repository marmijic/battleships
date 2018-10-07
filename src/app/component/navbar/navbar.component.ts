import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navItems: Array<any> = [
    {
      name: 'Home',
      link: ''
    },
    {
      name: 'Players',
      link: 'players'
    }
  ]
  constructor(private router: Router) { }

  private getActive(): string {
    return this.router.url;
  }

}
