import { Component } from '@angular/core';
import { Router } from "@angular/router";  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isloggedin = false;

  navbarCollapsed = true;

  constructor(private router: Router) { 
    if (localStorage.getItem('Loginuser')) {
      this.isloggedin = true;
    }
  }
  onLogout() {  
    localStorage.removeItem('Loginuser');
    this.isloggedin = false;  
    this.router.navigate(['/']);
  } 
 

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
