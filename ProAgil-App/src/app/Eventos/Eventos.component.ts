import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-Eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: Evento[];
  eventosFiltrados: Evento[];

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;

  // tslint:disable-next-line:variable-name
  _FiltroLista: string;

  constructor(private eventoService: EventoService, private modalService: BsModalService) {
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  get FiltroLista(): string {
    return this._FiltroLista;
  }

  set FiltroLista(value: string) {
    this._FiltroLista = value;
    this.eventosFiltrados = this.FiltroLista
      ? this.filtrarEvento(this.FiltroLista)
      : this.eventos;
  }

  

  ngOnInit() {
    this.getEventos();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      // tslint:disable-next-line:align
      // tslint:disable-next-line:variable-name
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        // init eventos filtrados
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      (evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
}
