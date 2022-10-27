import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as e from 'express';
import { ResponseModel } from 'src/app/models/response';
import { JuegoApiService } from 'src/app/services/juego-api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  idParticipante: any = 0;

  public url: string = '';
  varlocal = '';

  pantalla: string = 'home'; //share

  informacionPreRegistro: ResponseModel = { state: 'fail', data: null, message: '' };
  informacionQuinielas: ResponseModel = { state: 'fail', data: [], message: '' };
  informacionQuinielasPremium: ResponseModel = { state: 'fail', data: [], message: '' };
  participanteInfo: ResponseModel = { state: 'fail', data: [], message: '' };

  text: string = `
*Participa en nuestra quiniela DATUM*%0A%0A
Registrate aca:%0A 
`;


  constructor(private route: ActivatedRoute, private apiQuiniela: JuegoApiService) {
    this.idParticipante = this.route.snapshot.params['idParticipante'];
  }

  ngOnInit(): void {
    this.getQuinielasByParticipante();
    this.getParticipanteInfo();



  }


  getParticipanteInfo() {
    this.apiQuiniela.getParticipanteInfo(this.idParticipante).subscribe(_response => {
      this.participanteInfo = _response;

    });
  }

  getQuinielasByParticipante() {
    this.apiQuiniela.getQuinielasByParticipante(this.idParticipante).subscribe(_response => {
      this.informacionQuinielas = _response;

    });
  }

  getAllQuinielasPremium() {
    this.pantalla = 'share';
    this.apiQuiniela.getAllQuinielasPremium().subscribe(_response => {
      this.informacionQuinielasPremium = _response;
    })
  }

  seleccionarQuiniela(d: any) {
    this.url = '';
    let index = this.informacionQuinielasPremium.data.indexOf(d);
    if (d.seleccionado == '0') {
      this.informacionQuinielasPremium.data[index].seleccionado = '1';
    }
    else {
      this.informacionQuinielasPremium.data[index].seleccionado = '0';
    }


    let array = 0;
    for (let d of this.informacionQuinielasPremium.data) {
      if (d.seleccionado == '1') {
        this.url = this.url + (d.codigo + 'XC-DS');
      }
      array++;
    }
  }

  generarCodigo() {
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
    Swal.fire(
      'Exito',
      'Invitación generada',
      'success'
    );
    this.pantalla = 'compartir'
    this.url = '';
    this.url = `${environment.http}${location.host}/sing-up/${(this.informacionPreRegistro.data.id)}`;

    this.text = `
      *Participa en nuestra quiniela DATUM*%0A%0A
      Registrate aca:%0A 
    `;


    this.text = `${this.text} ${this.url}`
  }

}
