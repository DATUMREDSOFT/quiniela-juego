import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseModel } from 'src/app/models/response';
import { JuegoApiService } from 'src/app/services/juego-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {

  informacionJuego: ResponseModel = { state: 'fail', data: { quiniela: null }, message: '' };
  fasesJuego: ResponseModel = { state: 'fail', data: { quiniela: null }, message: '' };

  //preguntas

  informacionPreguntas: ResponseModel = { state: 'fail', data: [], message: '' };

  idQuiniela: any = 0;
  idParticipante: any = 0;

  order: string = 'nombre';

  constructor(private route: ActivatedRoute, private apiQuiniela: JuegoApiService,) {
    this.idQuiniela = this.route.snapshot.params['idQuiniela'];
    this.idParticipante = this.route.snapshot.params['idParticipante'];
  }

  ngOnInit(): void {
    this.getQuinielaByGame();

    this.getPreguntasByQuinielaParticipante();
  }


  getQuinielaByGame() {
    Swal.fire({
      title: 'Cargando...',
      html: 'Por favor espera',
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
        this.apiQuiniela.getQuinielaByGame(this.idParticipante, this.idQuiniela).subscribe(_response => {
          this.informacionJuego = _response;
          Swal.hideLoading();
          Swal.close();
        });
      },
      willClose: () => {
        Swal.hideLoading()
      }
    })
  }

  getFaseByIdQuiniela() {
    this.apiQuiniela.getFaseByIdQuiniela(this.idQuiniela).subscribe(_response => {

      if (_response.state == 'success') {
        let contador = 0;
        for (let f of _response.data) {

          this.apiQuiniela.getPartidosByIdFase(f.id, this.idQuiniela, this.idParticipante).subscribe(_responsePartidos => {
            //_response.data[contador] = { ...f, partidos: _responsePartidos.data, preguntas:p.preguntas }
            _response.data[contador] = { ...f, partidos: _responsePartidos.data }
            for (let p of this.informacionPreguntas.data) {
              if (p.nombreFase == f.nombre) {
                _response.data[contador] = { ..._response.data[contador], preguntas: p.preguntas };

              }
            }



            contador++;
          });
        }
      }




      this.fasesJuego = _response;



      console.log('this.fasesJuego', this.fasesJuego)

      // this.ordenarAsc(this.fasesJuego.data, 'nombre')



    });
  }

  ordenarAsc(p_array_json: any, p_key: any) :any[]{
    return p_array_json.sort(function (a: any, b: any) {
      return a[p_key] > b[p_key];
    });
  }

  data(): any[] {
    let r = [];
     r = this.ordenarAsc(this.fasesJuego.data, 'nombre');
    return r;
  }

  getPreguntasByQuinielaParticipante() {
    this.apiQuiniela.getPreguntasByQuinielaParticipante(this.idParticipante, this.idQuiniela).subscribe(_response => {
      console.log(_response.data);

      let arrayRespuesta: any[] = _response.data;

      let nuevoArray: any[] = []
      let arrayTemporal: any[] = []

      for (var a = 0; a < arrayRespuesta.length; a++) {

        arrayTemporal = nuevoArray.filter(resp => resp["nombreFase"] == arrayRespuesta[a]["nombreFase"])

        if (arrayTemporal.length > 0) {
          nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["preguntas"].push(arrayRespuesta[a])
        } else {
          nuevoArray.push({ "nombreFase": arrayRespuesta[a]["nombreFase"], "fechaMaxRespuesta": arrayRespuesta[a]["fechaMaxRespuesta"], "puntosPreguntaAcertada": arrayRespuesta[a]["puntosPreguntaAcertada"], "preguntas": [arrayRespuesta[a]] })
        }
      }

      console.log('1ER Depurador', nuevoArray);

      for (var a = 0; a < nuevoArray.length; a++) {
        let arrayRespuesta2: any[] = nuevoArray[a].preguntas;
        let nuevoArray2: any[] = []
        let arrayTemporal2: any[] = []

        for (var b = 0; b < arrayRespuesta2.length; b++) {

          arrayTemporal2 = nuevoArray2.filter(resp => resp["pregunta"] == arrayRespuesta2[b]["pregunta"])

          if (arrayTemporal2.length > 0) {
            nuevoArray2[nuevoArray2.indexOf(arrayTemporal2[0])]["respuesta"].push(arrayRespuesta2[b])
          } else {
            nuevoArray2.push({ "pregunta": arrayRespuesta2[b]["pregunta"], "respuestaSeleccionada": arrayRespuesta2[b]["respuestaSeleccionada"], "idPregunta": arrayRespuesta2[b]["idPregunta"], "idRespuesta": arrayRespuesta2[b]["idRespuesta"], "idbk": arrayRespuesta2[b]["idbk"], "resultado": arrayRespuesta2[b]["resultado"], "resultadobk": arrayRespuesta2[b]["resultadobk"], "idQuinielaParticipante": arrayRespuesta2[b]["idQuinielaParticipante"], "respuesta": [arrayRespuesta2[b]] })
          }

        }


        nuevoArray[a].preguntas = nuevoArray2;

        console.log(nuevoArray);
      }


      _response.data = nuevoArray;



      this.informacionPreguntas = _response;
      console.log('informacionPreguntas.data', this.informacionPreguntas.data);
      this.getFaseByIdQuiniela();


    });
  }

}
