import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css'],
  preserveWhitespaces:true
})
export class PessoasGridComponent {

  @Input() pessoas: any;
  constructor() { }


}
