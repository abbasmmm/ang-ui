import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Menu } from 'src/app/home/side-menu/side-menu.component';
import { filter, map, share } from 'rxjs/operators';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart, ActivationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface LayoutEvent {
  name?: LayoutEvents;
  source?: string;
  value?: any;
}

export type LayoutEvents = 'isBusy' | 'regionRequired' | 'searchRequired' | 'regionChange' | 'headerChange' | 'menuChange' | 'menuNavigateTo' | 'searchClick' | 'themeChange' | 'loadingLazyRoute' | 'fixedSideNav' | 'highlightMainMenu'
export type MenuType = 'apps' | 'book' | 'help'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  appChange(app: any) {
    this.setHeader(app);
  }
  private eventBus$ = new BehaviorSubject<LayoutEvent>({});
  private configLoaded$ = new BehaviorSubject<any>({});

  activeRequestCount = 0;
  private loadSub: any;
  private prevUrl:string|null= null;
  configuration: any = {};
  appId: any;

  constructor(private router: Router, private snackbar: MatSnackBar) {
    
    this.router.events.subscribe(event => {

      if (event instanceof RouteConfigLoadStart) {
        this.eventBus$.next({ name: 'loadingLazyRoute', value: true });
      }
      else if (event instanceof RouteConfigLoadEnd) {
        this.eventBus$.next({ name: 'loadingLazyRoute', value: false });
      }
      else if (event instanceof NavigationStart && event.url != this.prevUrl) {
        this.prevUrl = event.url;
      }
      else if(event instanceof ActivationEnd)
      {
        this.appId = event.snapshot.params['appId'];
      }
    });
  }

  rootPathsToPreventLayoutReset = []
  public setHeader(header, rootPath = null) {
    // this rootpath will be used to stop changing the header when the child routes changed.
    this.rootPathsToPreventLayoutReset['headerChange'] = rootPath;
    this.eventBus$.next({ name: 'headerChange', value: header });
  }

  public setMenu(menuItems: Menu[], rootPath = null): any {
    this.rootPathsToPreventLayoutReset['menuChange'] = rootPath;
    this.eventBus$.next({ name: 'menuChange', value: menuItems });
  }

  public setFixedSideNav(isFixed, rootPath = null) {
    this.rootPathsToPreventLayoutReset['fixedSideNav'] = rootPath;
    this.eventBus$.next({ name: 'fixedSideNav', value: isFixed });
  }

  highlightMainMenu(menu: MenuType, menuHeader: string): any {
    this.eventBus$.next({ name: 'highlightMainMenu', value: { menu: menu, header: menuHeader } });
  }

  regionFeatureRequired(required: boolean, rootPath = null) {
    this.rootPathsToPreventLayoutReset['regionRequired'] = rootPath;
    this.eventBus$.next({ name: 'regionRequired', value: required });
  }


  searchFeatureRequired(required: boolean, rootPath = null) {
    this.rootPathsToPreventLayoutReset['searchRequired'] = rootPath;
    this.eventBus$.next({ name: 'searchRequired', value: required });
  }

  setBusy(isBusy: boolean, message: string = ''): any {
    this.eventBus$.next({ name: 'isBusy', value: { isBusy: isBusy, message: message } });
  }

  themeChanged(theme: any): any {
    this.eventBus$.next({ name: 'themeChange', value: theme })
  }

  search(): any {
    this.eventBus$.next({ name: 'searchClick' })
  }

  regionChange(region: any): any {
    this.eventBus$.next({ name: 'regionChange', value: region });
  }

  menuNavigateTo(navigateTo: any): any {
    console.log(navigateTo);
    this.router.navigate([navigateTo]);
    // this.eventBus$.next({ name: 'menuNavigateTo', value: navigateTo });
  }

  on(event: LayoutEvents, action: any): Subscription {
    return this.eventBus$.pipe(
      filter((e: LayoutEvent) => {
        return e.name === event
      }),
      map((e: LayoutEvent) => e.value)).subscribe(action);
  }

  onConfigLoaded(action: any) {
    return this.configLoaded$.subscribe(action);
  }


  loadConfiguration() {
    // if (!this.loadSub) {
    //   this.loadSub = this.api.post('Configuration/GetConfiguration/', {}).pipe(share());
    // }

    // this.loadSub.subscribe(x => {
    //   this.configuration = x;
    //   this.configuration.isProd = x.environment.toLowerCase().indexOf('prod') !== -1
    //   this.configLoaded$.next(this.configuration)
    // });

    this.configLoaded$.next({userName : "M M Abbas Mashahaddy", environment:'DEV'})
  }

  navigateTo(url) {
    this.router.navigateByUrl(url);
  }

  showSnackbar(message, duration = 5000, buttonText = 'Ok') {
    this.snackbar.open(message, buttonText, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: duration
    })
  }
}
