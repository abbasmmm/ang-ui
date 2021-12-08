import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectAppComponent } from '../select-app/select-app.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() changeTheme = new EventEmitter<String>();
  underlying: any;
  user: any;
  title: any = '';
  isBusy: any;
  busyMessage: any;
  busyDialogRef: any;
  config: any = { userName: "M M Abbas Mashahaddy" };
  openMenu: any;
  currentMenu: any;
  highlightMenu: any;

  constructor(
    public dialog: MatDialog,
    public layoutService: LayoutService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit(): void {
    console.log('----------------------header INIT-----------------------')

    this.layoutService.on('headerChange', x => {
      this.title = x;

      this.titleService.setTitle(`Cashflows ${(!!x && x !== 'Cashflows' ? '- ' + x : '')}`);
    });

    this.layoutService.on('isBusy', x => {
      if (x.isBusy) {
        this.busyDialogRef = this.dialog.open(BusyIndicatorComponent, {
          panelClass: 'transparent-background',
          disableClose: true,
          closeOnNavigation: false,
          data: { busyMessage: x.message }
        })
      }
      else if (this.busyDialogRef) {
        this.busyDialogRef.close();
        this.busyDialogRef = null;
      }
    })

    this.layoutService.onConfigLoaded(x => this.config = x);

    this.layoutService.on('highlightMainMenu', x => {
      this.showMenu(true, x.menu, x.header);
    });
  }

  ngOnDestroy() {

  }

  openSearch() {
    this.layoutService.search();
  }


  setTheme(theme) {
    this.changeTheme.emit(theme);
  }

  showMenu(val, menu = '', header = '') {
    this.openMenu = val;
    this.currentMenu = menu;
    this.highlightMenu = header;
  }

  navigateTo(url) {
    this.router.navigateByUrl(url);
  }

  changeApp() {
    const dialogRef = this.dialog.open(SelectAppComponent, {
      maxWidth: '400px',
      width: '400px',
      backdropClass: 'backdropBackground',
      panelClass: 'transparent-background',
      disableClose: true,
      closeOnNavigation: false
    });

    dialogRef.afterClosed().subscribe(app => {
      if (!!app) {
        this.layoutService.appChange(app);
      }
    });
  }
}