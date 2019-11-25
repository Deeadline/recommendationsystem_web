import {Component, OnInit} from '@angular/core';
import {navigationLinks} from '../../../shared/_nav';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout-default',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  private links = navigationLinks;

  constructor(private router: Router) {
  }

  public ngOnInit() {

  }

  private getPath(link): string {
    const config = this.router.config;
    const result = this.findByName(config, link.id);
    return result && result.hasOwnProperty('path') ? '/' + result.path : '/not-found';
  }

  private findByName(config, id) {
    if (!Array.isArray(config)) {
      return false;
    }
    for (const e of config) {
      if (e.hasOwnProperty('data') && e.data.hasOwnProperty('id') && e.data.id === id) {
        return e;
      } else if (e.hasOwnProperty('children')) {
        const child = this.findByName(e.children, id);
        if (child) {
          return child;
        }

      }
    }
  }
}
