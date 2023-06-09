import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ProfileComponent } from '../Modals/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }
  is_loggedIn = 0;

  ngOnInit() {
    if (this.authService.isTokenExist()) {
      this.is_loggedIn = 1;
    }
  }

  profile() {
    const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  logout() {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      this.router.navigateByUrl("/login");
    }
  }
}
