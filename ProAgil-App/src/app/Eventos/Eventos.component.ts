import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: Evento[];
  eventosFiltrados: Evento[];
  evento: Evento;

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;

  modoSalvar = 'post';
  bodyDeletarEvento = '';

  // tslint:disable-next-line:variable-name
  _FiltroLista: string;

  titulo = 'Eventos';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
  ) {
    localeService.use('pt-br');
  }

  openModal(template: any, idEvento: number = null) {
    this.registerForm.reset();

    template.show(template);
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
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
    this.Validation();
    this.getEventos();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  Validation() {
    this.registerForm = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemUrl: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.maxLength(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);

        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Incluído com sucesso!');
          },
          (error) => {
            this.toastr.error(`Erro ao incluír evento: ${error}`);
          }
        );
      }
      else{
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);

        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
            this.toastr.success('Alterado com sucesso!');
          },
          (error) => {
            this.toastr.error(`Erro ao alterar evento: ${error}`);
          }
        );
      }
    }
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      // tslint:disable-next-line:align
      // tslint:disable-next-line:variable-name
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        // init eventos filtrados
        this.eventosFiltrados = this.eventos;

      },
      (error) => {
        this.toastr.error(`Erro ao carregar eventos: ${error}`);
      }
    );
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      (evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.tema}`;

  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Excluído com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao tentar excluír: ${error}`);
        }
    );
  }

}
