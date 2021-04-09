import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService, IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { IMainComponent } from './main.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements IMainComponent {


  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
  ) { 
    this.initialLoadUserLogin();
  }

  form: FormGroup;
  modalRef: BsModalRef;
  UserLogin: IAccount;
  Role = IRoleAccount;

  onShowKey(UserLogin) {
    this.alert.showRsaKey(UserLogin.rsakey);
}

  private initialLoadUserLogin() {
    // this.UserLogin = this.account.UserLogin;
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin =>  {
        this.UserLogin = userLogin;
        // console.log(this.UserLogin);
      })
      .catch(err => this.alert.notify(err.Message));
  }

}
