import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  recipesRouterLink: string = 'categories-filter';

  constructor() {

  }
}
