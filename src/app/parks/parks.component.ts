import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'parks.component.html'
})

export class ParksComponent {
  tiles = [
    {text: 'One', color: 'lightblue'},
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'},
  ];
}
