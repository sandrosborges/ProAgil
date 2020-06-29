import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Titulo',
  templateUrl: './Titulo.component.html',
  styleUrls: ['./Titulo.component.css']
})
export class TituloComponent implements OnInit {
 @Input() titulo: string;
  constructor() { }

  ngOnInit() {
  }

}
