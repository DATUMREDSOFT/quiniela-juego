import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseModel } from 'src/app/models/response';
import { JuegoApiService } from 'src/app/services/juego-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  filterQuery: string='';
  idQuiniela: any = 0;
  idParticipante: any = 0;
  informacionJuego: ResponseModel = { state: 'fail', data: { quiniela: null }, message: '' };
  informacionPremios: ResponseModel = { state: 'fail', data: [], message: '' };
  informacionRanking: ResponseModel = { state: 'fail', data: [], message: '' };
  
  constructor(private route: ActivatedRoute, private apiQuiniela: JuegoApiService,) {
    this.idQuiniela = this.route.snapshot.params['idQuiniela'];
    this.idParticipante = this.route.snapshot.params['idParticipante'];
  }

  ngOnInit(): void {
    this.getQuinielaByGame();
    this.getPremiosByIdQuiniela();
    this.getPuntosByQuiniela();
  }

  getPuntosByQuiniela(){
    this.apiQuiniela.getPuntosByQuiniela(this.idQuiniela).subscribe(_response => {
      let c =1;
      for(let d of _response.data){
        _response.data[c-1]={...d, index:c};
        c++;
      }
      
      this.informacionRanking =_response ;
     });
  }


  getPremiosByIdQuiniela() {
    Swal.fire({
      title: 'Cargando...',
      html: 'Por favor espera',
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
        this.apiQuiniela.getPremiosByIdQuiniela(this.idParticipante, this.idQuiniela).subscribe(_response => {
         this.informacionPremios = _response;
          Swal.hideLoading();
          Swal.close();
        });
      },
      willClose: () => {
        Swal.hideLoading()
      }
    })
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

}
