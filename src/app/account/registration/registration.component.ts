import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountserviceService } from '../accountservice.service';
import { Accountinfo } from '../accountinfo';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup;
  datasaved = false;
  message!: string;

  constructor(private formbuilder: FormBuilder, private accountservice: AccountserviceService, private router: Router) {
    if (localStorage.getItem('Loginuser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.setFormState();
  }

  setFormState(): void {
    this.regForm = this.formbuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let userinfo = this.regForm.value;
    this.createuserAccount(userinfo);
    this.regForm.reset();
  }

  createuserAccount(accinfo: Accountinfo) {
    this.accountservice.createaccount(accinfo).subscribe(
      (resResult) => {
        this.datasaved = true;
        this.message = "[" + resResult.msg + "]";
        this.regForm.reset();
      },
      (error: any) => {
        console.error(error);
        // Handle error response if necessary
      }
    );
  }
}
