import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container">
    <h1 class="text-center">Acesso negado!</h1>
  </div>
  `,
  styles:[
    ` .text-center{ text-align: center; }`
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}