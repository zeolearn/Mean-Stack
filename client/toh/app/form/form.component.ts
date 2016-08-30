import { Component } from '@angular/core';

@Component({
    selector: 'my-form',
    template: `<input type="text" name="name" value="" [(ngModel)]="person.name" placeholder="name">
    <input type="text" name="place" value="" [(ngModel)]="person.place" placeholder="place">
    <button (click)="onClick()">Add</button>
    <div><label *ngIf="person.id" [id]="person.id">{{person.id}}</label></div>` 
})
export class FormComponent {
    city: string = 'Bangalore';

}