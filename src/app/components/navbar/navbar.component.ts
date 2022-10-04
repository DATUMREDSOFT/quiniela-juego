import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  text: string = `
*Participa en nuestra quiniela DATUM*%0A%0A
Registrate aca: ${environment.http}${location.host}
`;

  constructor() { }

  ngOnInit(): void {
    $('.sidenav').sidenav();
  }

  

}
