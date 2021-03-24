import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'switch-button',
  template: `
    <div class="switch-button">
      <p class="switch-element left" [ngClass]="{ 'selected': !switchValue }">{{ options[0] }}</p>
      <label class="switch-element switch center">
        <input type="checkbox" [(ngModel)]="switchValue" (change)="onValueChange($event)">
        <span class="slider round"></span>
      </label>
      <p class="switch-element right" [ngClass]="{ 'selected': switchValue }">{{ options[1] }}</p>
    </div>
  `,
  styleUrls: ['./switch-button.component.less']
})
export class SwitchButtonComponent implements OnInit {
  @Input() options!: string[];
  @Input() switchValue!: boolean;
  @Output() switchValueChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (!this.options)
      this.options = ['Off', 'On'];
  }

  onValueChange(event: any) {
    this.switchValue = event.target.checked;
    this.switchValueChange.emit(this.switchValue);
  }


}
