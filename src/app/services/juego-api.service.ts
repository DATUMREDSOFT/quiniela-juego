import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JuegoApiService {

  constructor(private http: HttpClient) { }

  getCodigoByCorreo(correo: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/participante/getCodigoByCorreo/${correo}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }


  loginParticipante(body: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/participante/login`;
    return this.http.post<any>(url, body, options).pipe(retry(1), catchError(this.handleError));
  }

  postParticipantesPremium(body: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/participante/postParticipantesPremium`;
    return this.http.post<any>(url, body, options).pipe(retry(1), catchError(this.handleError));
  }


  postPreRegistro(body: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/postPreRegistro`;
    return this.http.post<any>(url, body, options).pipe(retry(1), catchError(this.handleError));
  }

  getPreregistroById(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getPreregistroById/${id}`;
    return this.http.get<any>(url,  options).pipe(retry(1), catchError(this.handleError));
  }

  deletePreregistroById(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/deletePreregistroById/${id}`;
    return this.http.delete<any>(url,  options).pipe(retry(1), catchError(this.handleError));
  }

  postQuinielaParticipante(body: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/participante/postQuinielaParticipante`;
    return this.http.post<any>(url, body, options).pipe(retry(1), catchError(this.handleError));
  }

  getValidQuinielaParticipante(body: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/participante/getValidQuinielaParticipante`;
    return this.http.post<any>(url, body, options).pipe(retry(1), catchError(this.handleError));
  }

  getQuinielaByGame(participante: any, quiniela: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/quinielas/juego/${participante}/${quiniela}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }

  getQuinielasByParticipante(participante: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getQuinielasByParticipante/${participante}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }

  getFaseByIdQuiniela(quiniela: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getFaseByIdQuiniela/${quiniela}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }


  getPremiosByIdQuiniela(participante: any, quiniela: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getPremiosByIdQuiniela/${participante}/${quiniela}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }

  getPreguntasByQuinielaParticipante(participante: any, quiniela: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getPreguntasByQuinielaParticipante/${participante}/${quiniela}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }


  getPuntosByQuiniela(quiniela: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getPuntosByQuiniela/${quiniela}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }


  getPartidosByIdFase(fase: any, quiniela?: any, participante?: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/getPartidosByIdFase/${fase}/${quiniela}/${participante}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }

  postResultadoPartido(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/postResultadoPartido`;
    return this.http.post<any>(url, data, options).pipe(retry(1), catchError(this.handleError));
  }

  putResultadoPartido(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/putResultadoPartido`;
    return this.http.put<any>(url, data, options).pipe(retry(1), catchError(this.handleError));
  }

  putResultadoPregunta(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/putResultadoPregunta`;
    return this.http.put<any>(url, data, options).pipe(retry(1), catchError(this.handleError));
  }

  postResultadoPregunta(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/juego/postResultadoPregunta`;
    return this.http.post<any>(url, data, options).pipe(retry(1), catchError(this.handleError));
  }

  getAllQuinielasPremium(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/premium/getAllQuinielasPremium`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }


  getParticipanteInfo(codigo:any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = { headers: headers };
    let url = environment.UrlAPi + `/api/participante/getParticipanteInfo/${codigo}`;
    return this.http.get<any>(url, options).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
