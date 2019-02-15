import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppFacade } from './+state/app.facade';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';

export interface Coordinate {
  x: number;
  y: number;
}

@Component({
  selector: 'jestify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  jesters: number[] = [];
  constructor(public appFacade: AppFacade, private cookieService: CookieService) {}
  ngOnInit() {
    let jesters = 0;
    try {
      if (this.cookieService.check('jesters')) {
        jesters = parseInt(this.cookieService.get('jesters'), 10);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.appFacade.setJesters(jesters);
    }

    this.appFacade.jesters$.subscribe(cnt => (this.jesters = new Array(cnt)));
  }
}
