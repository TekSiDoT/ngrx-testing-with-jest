import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Coordinate } from '../app.component';
import { getRandomInt } from './randomInt';
import { AppFacade } from '../+state/app.facade';
import { tap, filter, map, withLatestFrom, pairwise, scan } from 'rxjs/operators';
import { Observable, interval, timer } from 'rxjs';

@Component({
  selector: 'jestify-jester',
  templateUrl: './jester.component.html',
  styleUrls: ['./jester.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JesterComponent implements OnInit {
  width: number = getRandomInt(30, 100);
  coord: Coordinate = {
    x: getRandomInt(0, window.innerWidth),
    y: getRandomInt(0, window.innerHeight)
  };

  color$: Observable<number>;
  coord$: Observable<Coordinate>;
  flip$: Observable<boolean>;

  constructor(public appFacade: AppFacade) {
    this.flip$ = interval(200).pipe(map(() => Math.random() > 0.5));

    this.color$ = interval(200).pipe(
      withLatestFrom(this.appFacade.partyHard$),
      map(isParty => {
        return isParty[1] ? getRandomInt(0, 360) : 0;
      })
    );

    this.coord$ = timer(0, getRandomInt(500, 2000)).pipe(
      map(() => {
        const deltaX = getRandomInt(-10, 10);
        const deltaY = getRandomInt(-10, 10);
        return {
          x: this.coord.x + deltaX < window.innerWidth ? this.coord.x + deltaX : this.coord.x,
          y: this.coord.y + deltaY < window.innerWidth ? this.coord.y + deltaY : this.coord.y
        };
      })
    );
  }

  ngOnInit() {
    this.color$.subscribe();
    this.coord$.subscribe(coord => (this.coord = coord));
  }
}
