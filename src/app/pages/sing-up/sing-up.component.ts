import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/response';

import { JuegoApiService } from 'src/app/services/juego-api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
  idQuinielas: any = '';
  registrateForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    estado: new FormControl(''),
    clave: new FormControl(''),
    idMultimedia: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
  });

  idRegistro: any;
  informacionPreRegistro: ResponseModel = { state: 'fail', data: null, message: '' };

  constructor(private juegoApi: JuegoApiService, private router: Router, private route: ActivatedRoute) {
    this.idRegistro = this.route.snapshot.params['id'];

    this.juegoApi.getPreregistroById(this.idRegistro).subscribe(response => {
      this.informacionPreRegistro = response;

      if(response.data==null){
        Swal.fire({
          title: 'Lo sentimos',
          text: 'La invitación ya fue utilizada',
          icon: 'warning',
          confirmButtonText: 'Confirmar',
          allowEnterKey:false
        }).then(rx => {
          this.router.navigateByUrl('/');
        });
      }
    });
  }

  ngOnInit(): void {
  }



  submitRegistrate() {
    if (this.registrateForm.valid) {

      if (this.informacionPreRegistro.data)
        this.idQuinielas = this.informacionPreRegistro.data.quinielasAsignadas.split('XC-DS');


      this.juegoApi.deletePreregistroById(this.idRegistro).subscribe(responseDelete => {
        if (responseDelete.data.affectedRows > 0) {
          this.juegoApi.getCodigoByCorreo(this.registrateForm.value.correo).subscribe(_responseValid => {
            if (_responseValid.state == 'success') {
              if (_responseValid.data) {

                for (let pp of this.idQuinielas) {

                  if (pp != '') {
                    let body = {
                      idParticipante: _responseValid.data.id,
                      idQuiniela: pp
                    }

                    this.juegoApi.getValidQuinielaParticipante(body).subscribe(_responseValid2 => {

                      console.log('_responseValid', _responseValid2);
                      if (_responseValid2.state == 'success') {

                        if (_responseValid2.data.length == 0) {
                          this.juegoApi.postQuinielaParticipante(body).subscribe(_response => {
                            if (_response.state == 'success') {

                            }
                          });
                        }

                      }
                    });








                  }

                }
                
                Swal.fire({
                  title: 'Registrado',
                  text: 'El correo ingresado ya esta registrado, tu codigo es: ' + _responseValid.data.codigo,
                  icon: 'success',
                  confirmButtonText: 'Confirmar'
                }).then(rx => {
                  this.router.navigateByUrl('/');
                  /* this.loginForm.get('codigo')?.setValue(_responseValid.data.codigo);
                  this.pantalla = 'login'; */
                });
              }
              else {
                this.juegoApi.postParticipantesPremium(this.registrateForm.value).subscribe(_response => {
                  if (_response.state == 'success') {
                    Swal.fire({
                      title: 'Participante registrado',
                      text: 'Su codigo para iniciar sesion es: ' + _response.data.codigo,
                      icon: 'success',
                      confirmButtonText: 'Confirmar'
                    }).then(res => {
                      this.router.navigateByUrl('/');
                    });

                    for (let pp of this.idQuinielas) {

                      if (pp != '') {
                        let body = {
                          idParticipante: _response.data.id,
                          idQuiniela: pp
                        }
                        this.juegoApi.postQuinielaParticipante(body).subscribe(_response => {
                          if (_response.state == 'success') {

                          }
                        });
                      }

                    }


                  }
                });
              }
            }
          });
        }
        else {
          Swal.fire({
            title: 'Lo sentimos',
            text: 'Su Invitación no existe ',
            icon: 'error',
            confirmButtonText: 'Confirmar'
          }).then(rx => {
            this.router.navigateByUrl('/');
          });
        }
      });







    } else {
      Swal.fire({
        title: 'ERROR',
        text: 'Por favor complete el formulario',
        icon: 'error',
        confirmButtonText: 'Confirmar'
      });
    }
  }

}
