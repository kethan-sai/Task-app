import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}

  showHead = false;

  constructor(private authService: AuthService, private router: Router) {
    console.log('log: ' + this.authService.isLoggedIn());

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/auth') {
          this.showHead = false;
          this.authService.logout();
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
