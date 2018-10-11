import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';
import { Loader } from 'src/app/models/loader';

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
