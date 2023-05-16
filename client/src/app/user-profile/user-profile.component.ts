import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  currentName: any;
  currentMail: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUserProfile();

    
  }
  

  getUserProfile() {
    this.authService.getUserProfileToken().subscribe(
      (data) => {
        this.currentUser = data.user;
        this.currentName = data.name;
        this.currentMail = data.email;
      },
      (error) => {
        console.error(error);
        // Gestisci l'errore
      }
    );
  }
}
