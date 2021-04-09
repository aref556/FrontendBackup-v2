import { Component, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shareds/services/account.service';
import { AuthenService } from '../../../services/authen.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedsService } from '../../../shareds/services/shareds.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
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
        this.alert.confirm().then(status => {
            if (!status) return;
            this.account
                .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
                .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
                .catch(err => this.alert.notify(err.Message));
        });
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
            username: [''],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            telphone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            facebook: ['', [Validators.required]],
            line: ['', [Validators.required]],

            // address: ['', [Validators.required]],
            image: [null]
        });
        // disabled อีเมล์
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
