import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService, IAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { IRsaKey, IRsaKeyComponent } from './rsa-key.interface';

@Component({
  selector: 'app-rsa-key',
  templateUrl: './rsa-key.component.html',
  styleUrls: ['./rsa-key.component.css']
})
export class RsaKeyComponent implements IRsaKeyComponent {

  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private modalService: BsModalService,
    private shareds: SharedsService
  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
  }

  form: FormGroup;
  modalRef: BsModalRef;

  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.alert.confirm().then(status => {
      if (!status) return;
      this.account
        .onUpdateRSA(this.authen.getAuthenticated(), this.form.value)
        .then(() => this.alert.notify('[บันทึกข้อมูลสำเร็จ]', 'info'))
        .catch(err => this.alert.notify(err.Message));
    });
  }

  rsakey: string;

  // สร้างฟอร์ม 
  private initialCreateFormData() {
    this.form = this.buider.group({
      rsakey: ['', [Validators.required]],
    });
  }

  // โหลดข้อมูลใหม่พร้อมกับ Update form data
  private initialLoadUpdateFormData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['rsakey'].setValue(user.rsakey);
      })
      .catch(err => this.alert.notify(err.Message));
  }

}
