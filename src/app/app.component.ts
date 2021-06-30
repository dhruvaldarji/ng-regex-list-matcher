import { Component, OnInit, OnDestroy, VERSION } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly appTheme$ = this.themeService.getAppTheme();

  readonly appName$ = this.appService.getAppName();
  readonly appSubtitle$ = this.appService.getAppDescription();
  readonly appInstructions$ = this.appService.getAppInstructions();

  readonly NG_VERSION = `v${VERSION.major}`;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly appService: AppService,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService
      .setTheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.appService.setAppName('Regex List Matcher');
    this.appService.setAppDescription(
      'An example of how Regex can be used to reduce the complexity of string matchers.'
    );
    this.appService.setAppInstructions([
      'This example allows the user to assert that strings from some dataset starts with some value in a known list. If a match is found, the results are returned.',
      'Find the algorithm and modify the data in the <strong>"services/matcher.service.ts"</strong> file.',
      'Modify the view layer via the <strong>"demo/demo.component.ts"</strong> file.'
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
