import { NgModule } from '@angular/core';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AuthenticateComponent],
  imports: [
    FormsModule, 
    RouterModule.forChild([{ path: '', component: AuthenticateComponent }]), 
    SharedModule
  ]
})
export class AuthModule { }
