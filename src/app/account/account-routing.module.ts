import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {AccountserviceService} from './accountservice.service';

const routes: Routes = [{path:'register',component:RegistrationComponent},  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AccountserviceService], // Make sure it's listed here

  exports: [RouterModule]
})
export class AccountRoutingModule { }
