import { Component, OnInit } from '@angular/core';
import { Router, GuardsCheckStart, GuardsCheckEnd, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router";

// import { LoggerService } from '@my/logger-lib';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  showLoadingIndicator = false;

  constructor(
          private router: Router,
          // private logger: LoggerService
  ) {

      /*
        logger.debug('Manfred was here ... You\'ve been haaaacked');
        logger.log('Application started ... ');
      */

    router.events
          .filter(e => e instanceof NavigationStart
                  || e instanceof GuardsCheckEnd)
          .subscribe(event => {
                  this.showLoadingIndicator = true;
          });

    router.events.filter(
                    e => e instanceof NavigationEnd
                        || e instanceof  NavigationError
                        || e instanceof NavigationCancel
                        || e instanceof GuardsCheckStart )
          .subscribe(event => {
                  this.showLoadingIndicator = false;
          });

    }
}
