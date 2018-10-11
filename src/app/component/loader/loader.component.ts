import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  public showProgress: boolean = true;

  constructor() {
    setTimeout(() => {
      this.showProgress = false;
    }, 3000);
  }

}
