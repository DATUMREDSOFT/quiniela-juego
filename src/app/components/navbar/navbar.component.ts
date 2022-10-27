import { Component, Input, OnInit } from '@angular/core';
import { ResponseModel } from 'src/app/models/response';
import { JuegoApiService } from 'src/app/services/juego-api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() idQuiniela: any;
  @Input() page!: any;
  @Input() idParticipante: any;
  @Input() informacionJuego: any;
  @Input() titulo: any;
  url = '';

  informacionPreRegistro: ResponseModel = { state: 'fail', data: null, message: '' };

  text: string = `
*Participa en nuestra quiniela DATUM*%0A%0A
Registrate aca: ${environment.http}${location.host}
`;

  constructor(private apiQuiniela: JuegoApiService) { }

  ngOnInit(): void {
    $('.sidenav').sidenav();
  }





  generarCodigo() {
    this.url = (this.idQuiniela + 'XC-DS');
    Swal.fire({
      title: '¿Deseas generar un código?',
      text: "Este código unicamente puede ser utilizado por un participante",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiQuiniela.postPreRegistro({ quinielasAsignadas: this.url }).subscribe(_response => {
          this.informacionPreRegistro = _response;
          if (_response.state == 'success') {

            this.compartirWsp(btoa(_response.data.id))
          }
          else {
            Swal.fire(
              'Error',
              'Invitación no generada',
              'error'
            );



          }
        });
      }
    })
  }

  compartirWsp(data: string) {

    this.url = '';

    this.url = `${environment.http}${location.host}/sing-up/${(this.informacionPreRegistro.data.id)}`;

    this.text = `
    *Participa en nuestra quiniela DATUM*%0A%0A
    Registrate aca:%0A 
  `;

    this.text = `${this.text} ${this.url}`


    Swal.fire({
      title: 'Link Generado',
      confirmButtonText: 'Salir',
      html: ` <p>${this.url}</p> <a href="https://api.whatsapp.com/send?text=${this.text}" target="_blank" class="btn green" *ngIf="url!=''" >Compartir por Whatsapp</a>`

    }).then((result) => {

    })



  }



}
