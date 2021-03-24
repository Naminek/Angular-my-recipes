import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  collapse: boolean = false;

  constructor(private routingService: RoutingService) {
  }

  get recipesRouterLink(): string {
    return '/recipes/' + this.routingService.recipesRouterLink;
}

  ngOnInit(): void {
  }



}
