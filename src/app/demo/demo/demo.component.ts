import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Match } from '../../interfaces/match.interface';
import { MatcherService } from '../../services/matcher.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  sourcesList = new BehaviorSubject<string[]>(this.matcher.getSources());

  dataset = new BehaviorSubject<string[]>(this.matcher.getDataset());

  matches = new BehaviorSubject<Match[]>(null);

  private readonly destroy = new Subject();

  constructor(private readonly matcher: MatcherService) {}

  ngOnInit() {
    combineLatest([this.sourcesList, this.dataset])
      .pipe(
        map(([sources, dataset]) => {
          return this.matcher.getMatches(sources, dataset);
        }),
        takeUntil(this.destroy)
      )
      .subscribe(matches => {
        this.matches.next(matches && matches.length ? matches : null);
      });
  }
}
