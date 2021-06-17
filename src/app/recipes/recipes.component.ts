import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutingService } from '../routing.service';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit, OnDestroy {
  filterOptions: string[] = ['categories', 'ingredients']; // categories: false, ingredients: true in switch button
  filterByValue: boolean = false; // true if ingredients-filter is selected
  filterBy: string = '';
  filterSubscription: Subscription;
  isHeaderVisible: boolean = true;

  constructor(
    public router: Router,
    // private route: ActivatedRoute
    private routingService: RoutingService,
    private recipesService: RecipesService
    )
  {
    this.filterByValue = routingService.recipesRouterLink == 'ingredients-filter';
    this.filterBy = routingService.recipesRouterLink;
    this.filterSubscription = this.recipesService.filterHeaderVisiblityChanged.subscribe((value: boolean) => {
      this.isHeaderVisible = value;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          if (event.urlAfterRedirects == '/recipes/categories-filter'
              || event.urlAfterRedirects.includes('/recipes/recipe-list/')) {
            this.filterByValue = false;
            this.filterBy = 'categories-filter';
          } else if (event.urlAfterRedirects == '/recipes/ingredients-filter') {
            this.filterByValue = true;
            this.filterBy = 'ingredients-filter';
          }
      }
      // if (event instanceof NavigationError) {
      //     // Present error to user
      //     console.log(event.error);
      // }
  });

    this.onSarchByValueChanged();
  }



  ngOnInit(): void {
    console.log(this.recipesService.recipesObservable);
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
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
