import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PingCheck, PingCheckIns} from './models/ping-check.model';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PingCheckService {
  private endpoint!: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.apiUrl}/api/ping`;
  }

  // Ottieni tutti i monitor di ping dell'utente corrente
  getPingChecks(): Observable<PingCheck[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PingCheck[]>(this.endpoint, { headers });
  }

  // Crea un nuovo monitor di ping per l'utente corrente
  createPingCheck(pingCheck: PingCheckIns): Observable<PingCheckIns> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<PingCheckIns>(this.endpoint, pingCheck, { headers });
  }

  // Aggiorna un monitor di ping esistente
  updatePingCheck(pingCheckId: string, pingCheck: PingCheckIns): Observable<PingCheckIns> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.endpoint}/${pingCheckId}`;
    return this.http.put<PingCheckIns>(url, pingCheck, { headers });
  }

  // Elimina un monitor di ping
  deletePingCheck(pingCheckId: string): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.endpoint}/${pingCheckId}`;
    return this.http.delete<void>(url, { headers });
  }
}
