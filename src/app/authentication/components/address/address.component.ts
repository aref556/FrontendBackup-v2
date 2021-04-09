import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { IAddressComponent } from './address.interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements IAddressComponent {

  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
  ) { 
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
  }

    // บันทึกข้อมูล
    onSubmit() {
      if (this.form.invalid) return this.alert.someting_wrong();
      this.alert.confirm().then(status => {
          if (!status) return;
          this.account
              .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
              .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
              .catch(err => this.alert.notify(err.Message));
      });
  }

  form: FormGroup;

  // สร้างฟอร์ม 
  private initialCreateFormData() {
    this.form = this.buider.group({
        latitude: ['', [Validators.required]],
        longitude: ['', [Validators.required]],
        organization: [''],
        num: [''],
        subdistrict: [''],
        district: [''],
        province: [''],
        zipcode: [''],
    });
}

// โหลดข้อมูลใหม่พร้อมกับ Update form data
private initialLoadUpdateFormData() {
    this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(user => {
            this.form.controls['latitude'].setValue(user.latitude);
            this.form.controls['longitude'].setValue(user.longitude);
            this.form.controls['organization'].setValue(user.organization);
            this.form.controls['num'].setValue(user.num);
            this.form.controls['subdistrict'].setValue(user.subdistrict);
            this.form.controls['district'].setValue(user.district);
            this.form.controls['province'].setValue(user.province);
            this.form.controls['zipcode'].setValue(user.zipcode);
        })
        .catch(err => this.alert.notify(err.Message));
}
}
