import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountserviceService } from '../accountservice.service';
import { Userloginfo } from '../userloginfo';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  datasaved = false;
  message!: string;
  status!: string;

  constructor(private formBuilder: FormBuilder, private accountService: AccountserviceService, private router: Router) {
    if (localStorage.getItem('Loginuser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.setFormState();
  }

  setFormState(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let userinfo = this.loginForm.value;
    this.userLogin(userinfo);
    this.loginForm.reset();
  }

  userLogin(logininfo: Userloginfo) {
    this.accountService.userLogin(logininfo).subscribe(
      (resResult: { [x: string]: string; }) => {
        let resp = JSON.stringify(resResult);
        console.log(resp);
        this.datasaved = true;
        this.message = resResult['msg'];
        this.status = resResult['status'];
        if (resResult['status'] === 'success') {
          localStorage.setItem('Loginuser', resp);
          this.router.navigate(['/']);

        } else {
          localStorage.removeItem('Loginuser');
        }
        this.loginForm.reset();
      },
      (error: any) => {
        console.error(error);
        // Handle error response if necessary
      }
    );
  }
}
