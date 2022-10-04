import { Component, Input, OnInit } from '@angular/core';
import { JuegoApiService } from 'src/app/services/juego-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  @Input() fase: any;

  date = new Date();

  constructor(private apiJuego: JuegoApiService) { }

  ngOnInit(): void {
  }

  converterToDate(date: any) {
    return new Date(date);
  }

  salvarEncuentro(data: any, index: any, max: any) {
    console.log(data);

    this.date = new Date();

    if (!(this.converterToDate(max) <= this.date)) {
      if ((data.previstoLocal >= 0 && data.previstoLocal != null) && (data.previstoVisitante >= 0 && data.previstoVisitante != null)) {
        this.apiJuego.postResultadoPartido(data).subscribe(_response => {
        });
        /* if (data.idResultado) {
          this.apiJuego.putResultadoPartido(data).subscribe(_response => {
  
          });
        }
        else {
          this.apiJuego.postResultadoPartido(data).subscribe(_response => {
          });
        } */
      }

      else {
        if (data.previstoLocalbk != null && data.previstoVisitantebk != null) {
          this.fase.partidos[index].previstoLocal = data.previstoLocalbk;
          this.fase.partidos[index].previstoVisitante = data.previstoVisitantebk;
        }

      }
    }
    else {
      Swal.fire({
        title: 'Lo sentimos',
        text: 'El tiempo para responder Fase se ha terminado',
        icon: 'warning',
        confirmButtonText: 'Confirmar'
      }).then(rx=>{
        this.fase.partidos[index].previstoLocal = data.previstoLocalbk;
        this.fase.partidos[index].previstoVisitante = data.previstoVisitantebk;
      });
    }






  }

}
