import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { expandMenu, rotateChevron } from 'src/app/animations';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [expandMenu, rotateChevron]
})
export class SideMenuComponent implements OnInit {
  menuItems: Menu[] = [];

  @Input() status;
  selectedMenu: Menu = {};
  constructor(private layoutSvc: LayoutService) {

  }

  ngOnInit(): void {
    this.subscriptions.push(this.layoutSvc.on('menuChange',
      x => {
        this.menuItems = x;
        this.menuItems.forEach(menu => {
          if (menu.isSelected)
            this.selectedMenu = menu;
        })
      }));
  }

  menuClick(menu: Menu) {
    if (!!menu.children) {
      menu.isExpanded = !menu.isExpanded;
    }

    // if (!!menu.navigateTo) {
    this.selectedMenu.isSelected = false;
    this.selectedMenu = menu;
    this.selectedMenu.isSelected = true;

    this.layoutSvc.menuNavigateTo(this.layoutSvc.appId + '/' + menu.navigateTo);
    // }
    console.log(menu)
  }

  subscriptions: Subscription[] = []

  ngOnDestroy() {
    this.ngOnDestroyBase();
  }

  ngOnDestroyBase() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}

export interface Menu {
  title?;
  icon?;
  navigateTo?;
  isExpanded?;
  isSelected?
  children?: Menu[]
}
