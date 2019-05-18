import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lancamento-grid',
  templateUrl: './lancamento-grid.component.html',
  styleUrls: ['./lancamento-grid.component.css'],
  preserveWhitespaces:true
})
export class LancamentoGridComponent {

  @Input() lancamentos:any;

  constructor() { }


}
