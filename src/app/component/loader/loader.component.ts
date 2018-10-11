import { Component, OnInit } from '@angular/core';
import { Loader } from 'src/app/models/loader';
import { LoaderService } from 'src/app/service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  public show: boolean = true;

  constructor(private loaderService: LoaderService) {
    this.loaderService.hide();
  }

  ngOnInit() {
    this.loaderService.loaderState.subscribe(
      (state: Loader) => {
        this.show = state.show;
      }
    )
  }

}
