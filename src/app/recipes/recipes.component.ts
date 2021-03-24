import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  filterOptions: string[] = ['categories', 'ingredients']; // categories: false, ingredients: true in switch button
  filterByValue: boolean = false;
  filterBy: string = '';

  constructor(
    public router: Router,
    // private route: ActivatedRoute
    private routingService: RoutingService
    )
  {
    this.filterByValue = routingService.recipesRouterLink == 'ingredients-filter';
    this.filterBy = routingService.recipesRouterLink;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          if (event.urlAfterRedirects == '/recipes/categories-filter') {
            this.filterByValue = false;
            this.filterBy = 'categories-filter';
          } else if (event.urlAfterRedirects == '/recipes/ingredients-filter') {
            this.filterByValue = true;
            this.filterBy = 'ingredients-filter';
          }
      }
      // if (event instanceof NavigationError) {
      //     // Hide loading indicator

      //     // Present error to user
      //     console.log(event.error);
      // }
  });

    this.onSarchByValueChanged();
  }



  ngOnInit(): void {

  }

  navigateRoute(): void {
    this.router.navigate(['recipes/' + this.filterBy]);
  }

  onSarchByValueChanged(): void {
    this.filterBy = this.filterByValue ? 'ingredients-filter' : 'categories-filter';
    this.routingService.recipesRouterLink = this.filterBy;
    this.navigateRoute();
  }

}
