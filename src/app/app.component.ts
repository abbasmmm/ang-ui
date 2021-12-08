import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, RoutesRecognized, ResolveStart, ActivatedRoute, NavigationEnd } from '@angular/router';
import { onSideNavChange, onMainContentChange, animateText } from './animations';
import { LayoutService } from './layout.service';

const themeKey = 'theme'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onSideNavChange, onMainContentChange, animateText]
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass: any;
  showSideNav = false;
  showSideNavText = false;
  fixedSideNav = false;
  loading = false;
  private componentBeforeNavigation = null;

  constructor(private overlayContainer: OverlayContainer, private router: Router, private route: ActivatedRoute, private layoutService: LayoutService) {

  }

  ngOnInit() {
    let currentTheme = localStorage.getItem(themeKey);
    if (!currentTheme)
      currentTheme = 'dark-theme';
    this.changeTheme(currentTheme);

    this.layoutService.setMenu([{title:'Upload Excel', navigateTo:'',icon:'upload'},{title:'View Cashflows', navigateTo:'view-cashflows', icon: 'grid_view'},])
    this.layoutService.on('loadingLazyRoute', x => this.loading = x);
    this.layoutService.on('fixedSideNav', x => {
      //its a hack to set the fixed sidenav before sidenavtoggle
      // need to rework on this code
      if (!x)
        this.fixedSideNav = false;

      this.sideNavToggle(x);
      this.fixedSideNav = x;
    });
  }

  sideNavStateChange() {
    this.fixedSideNav = !this.fixedSideNav;

    if (!this.fixedSideNav) {
      this.sideNavToggle(false);
    }
  }

  sideNavToggle(toggle: boolean) {
    if (!this.fixedSideNav) {

      if (this.showSideNav === toggle)
        return;

      this.showSideNav = toggle;
      if (this.showSideNav) {
        setInterval(() => this.showSideNavText = this.showSideNav, 100);
      }
      else
        this.showSideNavText = this.showSideNav;
    }
  }

  navigateToHome() {
    window.open(location.protocol + '//' + location.host);
  }

  changeTheme(theme: any) {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    console.log(overlayContainerClasses)
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
    this.componentCssClass = theme;
    localStorage.setItem(themeKey, theme);

    this.layoutService.themeChanged(theme);
  }
}
