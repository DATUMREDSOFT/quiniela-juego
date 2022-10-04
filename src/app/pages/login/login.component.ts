import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoApiService } from 'src/app/services/juego-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
  });

  registrateForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    estado: new FormControl(''),
    clave: new FormControl(''),
    idMultimedia: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
  });

  olvidoForm: FormGroup = new FormGroup({
    correo: new FormControl('', [Validators.required]),
  });

  pantalla: string = 'login'; // registrate

  clickIrARegistrate() {
    this.olvidoForm.reset();
    this.loginForm.reset();
    this.registrateForm.reset();
    if (this.pantalla == 'login') {
      this.pantalla = 'registrate';
    }
    else {
      this.pantalla = 'login';
    }
  }

  idQuiniela: any = '';
  idQuinielas: any = '';
  estado: any = '';
  constructor(private juegoApi: JuegoApiService, private router: Router, private route: ActivatedRoute) {
    sessionStorage.setItem('state', 'false');
    this.idQuiniela = this.route.snapshot.params['id'];
    this.estado = this.route.snapshot.params['estado'];
    if (this.estado != '' && this.idQuiniela) {
      this.pantalla = 'registrate';

      this.idQuinielas = this.idQuiniela.split('XC-DS');

   
    }
  }

  submit() {
    if (this.loginForm.valid) {


      this.juegoApi.loginParticipante(this.loginForm.value).subscribe(_response => {

        if (_response.state == 'success') {

          if (_response.data.quinielas == 0) {
            Swal.fire({
              title: _response.data.nombre,
              text: 'Lo sentimos, Aún no tienes una quiniela asignada',
              icon: 'warning',
              confirmButtonText: 'Confirmar'
            });
          }
          else {
            Swal.fire({
              title: _response.data.nombre,
              text: 'Bienvenido',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            }).then((result) => {
              sessionStorage.setItem('state', 'true');
              if (_response.data.quinielas == 1) {
                this.router.navigateByUrl('juego/' + _response.data.codigo + '/' + _response.data.principal);
              }

              else {
                this.router.navigateByUrl('home/' + _response.data.codigo);
              }
            });
          }
        }
        else {
          Swal.fire({
            title: 'Lo sentimos',
            text: 'El código no es valido',
            icon: 'warning',
            confirmButtonText: 'Confirmar'
          });
        }
      }, _error => {
        alert(_error);
      });

    }
    else {
      Swal.fire({
        title: 'ERROR',
        text: 'Código es requerido',
        icon: 'error',
        confirmButtonText: 'Confirmar'
      });
    }
  }

  submitRegistrate() {
    if (this.registrateForm.valid) {

      this.juegoApi.getCodigoByCorreo(this.registrateForm.value.correo).subscribe(_responseValid => {
        if (_responseValid.state == 'success') {
          if (_responseValid.data) {
            Swal.fire({
              title: 'Registrado',
              text: 'El correo ingresado ya esta registrado',
              icon: 'success',
              confirmButtonText: 'Confirmar'
            }).then(rx=>{
              this.loginForm.get('codigo')?.setValue(_responseValid.data.codigo);
              this.pantalla = 'login';
            });
            for(let pp of this.idQuinielas){

              if (pp != '') {
                let body = {
                  idParticipante: _responseValid.data.id,
                  idQuiniela: pp
                }

                this.juegoApi.getValidQuinielaParticipante(body).subscribe(_responseValid2 => {

                  console.log('_responseValid', _responseValid2);
                  if (_responseValid2.state == 'success') {

                     if(_responseValid2.data.length==0){
                      this.juegoApi.postQuinielaParticipante(body).subscribe(_response => {
                        if (_response.state == 'success') {
      
                        }
                      });
                    } 

                  }
                });


               
               




              }
             
            }
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
                  this.loginForm.get('codigo')?.setValue(_response.data.codigo);
                  this.pantalla = 'login';
                });

                for(let pp of this.idQuinielas){

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





    } else {
      Swal.fire({
        title: 'ERROR',
        text: 'Por favor complete el formulario',
        icon: 'error',
        confirmButtonText: 'Confirmar'
      });
    }
  }

  ngOnInit(): void {
  }

  olvidoCredencial() {
    if (this.olvidoForm.valid) {
      this.juegoApi.getCodigoByCorreo(this.olvidoForm.value.correo).subscribe(_response => {
        if (_response.state == 'success') {
          if (_response.data) {
            Swal.fire({
              title: 'Código recuperado',
              text: 'Su codigo para iniciar sesion es: ' + _response.data.codigo,
              icon: 'success',
              confirmButtonText: 'Confirmar'
            });
            this.loginForm.get('codigo')?.setValue(_response.data.codigo);
            this.pantalla = 'login';
          } else {
            Swal.fire({
              title: 'Advertencia',
              text: 'Correo no coincide con nuestros participantes registrados',
              icon: 'warning',
              confirmButtonText: 'Confirmar'
            });
          }


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
