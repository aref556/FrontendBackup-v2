import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { IProfileAdminComponent } from './profile-admin.interface';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements IProfileAdminComponent {
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

// บันทึกข้อมูล
onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.account
        .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
        .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
        .catch(err => this.alert.notify(err.Message));
}

// แปลงไฟล์รูปเป็น Base64
onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    this.shareds
        .onConvertImage(input)
        .then(base64 => imageControl.setValue(base64))
        .catch(err => {
            input.value = null;
            imageControl.setValue(null);
            this.alert.notify(err.Message);
        });
}

// เปิด Modal dialog
openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
}

// สร้างฟอร์ม 
private initialCreateFormData() {
    this.form = this.buider.group({
        username: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        telphone: [''],
        email: ['', [Validators.email]],
        facebook: [''],
        line: [''],
        image: [null]
    });
    // disabled ชื่อผู้ใช้
    this.form.get('username').disable();
}

// โหลดข้อมูลใหม่พร้อมกับ Update form data
private initialLoadUpdateFormData() {
    this.account
        .getUserLogin(this.authen.getAuthenticated())
        .then(user => {
            this.form.controls['username'].setValue(user.username);
            this.form.controls['firstname'].setValue(user.firstname);
            this.form.controls['lastname'].setValue(user.lastname);
            this.form.controls['telphone'].setValue(user.telphone);
            this.form.controls['email'].setValue(user.email);
            this.form.controls['facebook'].setValue(user.facebook);
            this.form.controls['line'].setValue(user.line);
            // this.form.controls['address'].setValue(user.address);
            this.form.controls['image'].setValue(user.image);
        })
        .catch(err => this.alert.notify(err.Message));
}
}
