import { Component, Input, OnInit } from '@angular/core';
import { JuegoApiService } from 'src/app/services/juego-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-preguntas',
  templateUrl: './grupo-preguntas.component.html',
  styleUrls: ['./grupo-preguntas.component.scss']
})
export class GrupoPreguntasComponent implements OnInit {

  @Input() fase: any;
  @Input() informacionPreguntas: any;
  @Input() fechaMaxima: any;

  date = new Date();

  constructor(private apiJuego: JuegoApiService) { }

  ngOnInit(): void {
  }


  converterToDate(date: any) {
    return new Date(date);
  }


  salvarEncuentro(data: any, index: any) {
    console.log(data);
    this.date = new Date();
    if (!(this.converterToDate(this.fechaMaxima) <= this.date)){
      if (data.resultadobk) {
        this.apiJuego.putResultadoPregunta(data).subscribe(_response => {
  
        });
      }
      else {
        this.apiJuego.postResultadoPregunta(data).subscribe(_response => {
  
        });
      }
    }
    else {
      Swal.fire({
        title: 'Lo sentimos',
        text: 'El tiempo para responder Fase se ha terminado',
        icon: 'warning',
        confirmButtonText: 'Confirmar'
      }).then(rx=>{
       
      });
    }

  




  }

}
