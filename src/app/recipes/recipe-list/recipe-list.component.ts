import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private id!: number;
  private sub: Subscription;

  constructor(route: ActivatedRoute) {
    this.sub = route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
