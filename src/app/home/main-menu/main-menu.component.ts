import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { topNavAnimation } from 'src/app/animations';
import { DialogService } from 'src/app/dialog.service';
import { LayoutService } from 'src/app/layout.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  animations: [topNavAnimation]
})
export class MainMenuComponent implements OnInit {

  @Input() open;
  @Input() highlightMenu;
  @Input()
  set currentMenu(val) {
    this._currentMenu = val

    this.changeMenu(val);
  }
  _currentMenu: any;
  slWebUrl: any;

  appsMenu: any = {};
  bookMenu: any = {};
  helpMenu: any = {};
  nonProdMenu: any = {
    'Non Prod Features': [
      {
        displayText: 'Observations Mockups',
        fullPath: 'observations'
      }
    ]
  };

  mainMenu: any = {};
  mainMenuTitles: string[] | undefined;


  constructor(private layoutSvc: LayoutService, private dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.layoutSvc.onConfigLoaded(x => {
      if (x.mainMenu) {
        this.slWebUrl = x.mainMenu.slWebUrl

        if (x.mainMenu) {
          this.buildMainMenu(x)
        }
        if (x.dynamicApps) {
          this.buildDynamicMenu(x);
        }
      }
    })
  }

  private changeMenu(val: any) {
    let menu = {};
    switch (val) {
      case 'apps':
        {
          menu = this.appsMenu;
          break;
        }
      case 'book':
        {
          menu = this.bookMenu;
          break;
        }
      case 'help':
        {
          menu = this.helpMenu
          break;
        }
      case 'nonprod':
        {
          menu = this.nonProdMenu;
          break;
        }
      default:
        menu = this.appsMenu;
    }
    this.mainMenuTitles = Object.keys(menu).sort((key1, key2) => {
      if (menu[key1].length < menu[key2].length) {
        return 1;
      }
      if (menu[key1].length > menu[key2].length) {
        return -1;
      }
      return 0;
    });
    ;
    this.mainMenu = menu;
    console.log(this.mainMenuTitles, this.mainMenu);
  }


  private buildMainMenu(x: any): any {

    const menuBuilder = (localMenu, menus, currentHeader) => {
      menus.forEach(menu => {
        if (menu.children && menu.children.length) {
          if (menu.displayText !== 'Book') {
            if (!localMenu[menu.displayText]) {
              localMenu[menu.displayText] = [];
            }
            menuBuilder(localMenu, menu.children, menu.displayText);
          }
        }
        else {
          if (!localMenu[currentHeader]) {
            localMenu[currentHeader] = [];
          }
          localMenu[currentHeader].push(menu);
        }
      });
    }

    menuBuilder(this.appsMenu, this.findMenu(x.mainMenu.menus, 'APPS'), 'Atlas Apps');
    menuBuilder(this.appsMenu, this.findMenu(x.mainMenu.menus, 'LEGACY_APPS'), 'Legacy Apps');
    menuBuilder(this.bookMenu, this.findMenu(x.mainMenu.menus, 'BOOK'), '');

    menuBuilder(this.helpMenu, this.findMenu(x.mainMenu.menus, 'HOME_HELP_DESK'), 'Help desk');
    menuBuilder(this.helpMenu, this.findMenu(x.mainMenu.menus, 'PROD_SUPPORT'), 'Prod Support');

    console.log(this.mainMenu);
  }

  findMenu(menus, menuId) {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];

      if (menu.menuId === menuId) {
        return menu.children;
      }

      if (menu.children) {
        const found = this.findMenu(menu.children, menuId);

        if (found)
          return found;
      }
    }
  }

  toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  private buildDynamicMenu(x: any) {
    const apps = x.dynamicApps.map(x => {
      return x.split('\\');
    });
    apps.forEach(arr => {
      const sectionHeader = this.toTitleCase(arr[1]);
      if (!this.appsMenu[sectionHeader])
        this.appsMenu[sectionHeader] = [];
      this.appsMenu[sectionHeader].push(this.getMenu(arr));
    });
    console.log(this.appsMenu);
  }

  getMenu(arr: any): any {
    let header = arr[2].split('.')[0];

    let fullPath = (arr[1] + '/ex/' + header);

    return {
      displayText: this.toTitleCase(header),
      fullPath: fullPath
    }
  }

  navigate(menu) {
    console.log(menu);
    if (menu.atlasMenuAction) {
      this.navigateTo(menu);
    }
    else {
      this.layoutSvc.navigateTo(menu.fullPath);
    }
  }

  navigateTo(menu: any) {
    switch (menu.atlasMenuAction) {
      case 'URL_NEWTAB': {
        window.open(menu.actionParam, "_blank");
        break;
      }
      case 'URL': {
        window.location.href = menu.actionParam;
        break;
      }  
      default: {
        console.log(' Could not open ' + menu.displayText + ', param: ' + menu.actionParam + ', action: ' + menu.atlasMenuAction);
      }
    }
  }
}
