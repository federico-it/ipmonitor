import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  opened=false;
  constructor(public authService: AuthService) { }
  logout() {
    this.authService.doLogout()
  }
  closeSidenav(): void {
    this.opened = false;
  }
}
