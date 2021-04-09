import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
import { AuthURL } from '../../authentication.url';
import { MemberService } from '../../services/member.service';
import { IAdminCreateComponent } from './admin-create.interface';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css'],
  providers: [MemberService]
})
export class AdminCreateComponent implements IAdminCreateComponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private member: MemberService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.forEach(params => {
      this.memId = params.id;
    });
    this.initialCreateFormData();
    this.initialUpdateFormData();
  }

  form: FormGroup;
  memId: any;
  roleItems: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Admin,
  ];
  onSubmit(): void {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    // หากเป็นการเพิ่มสมาชิกใหม่
    if (!this.memId) {
      this.member
        .createMemeber(this.form.value)
        .then(res => {
          this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info');
          this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
        })
        .catch(err => this.alert.notify(err.Message));
    }
    // หากเป็นการแก้ไขสมาชิก
    else {
      this.member
        .updateMember(this.memId, this.form.value)
        .then(res => {
          this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info');
          this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
        })
        .catch((err) => this.alert.notify(err.Message));
    }
  }
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role];
  }
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

  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      image: [],
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, this.validators.isPassword]],
      telphone: [''],
      facebook: [''],
      line: [''],
      firstname: [''],
      lastname: [''],
      address: [''],
      macaddress: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  // แก้ไขฟอร์ม
  private initialUpdateFormData() {
    if (!this.memId) return;
    this.member
      .getMemberById(this.memId)
      .then(member => {
        // นำข้อมูลมาใส่ ฟอร์ม
        const form = this.form;
        form.controls['image'].setValue(member.image);
        form.controls['username'].setValue(member.username);
        form.controls['firstname'].setValue(member.firstname);
        form.controls['lastname'].setValue(member.lastname);
        form.controls['telphone'].setValue(member.telphone);
        form.controls['email'].setValue(member.email);
        form.controls['facebook'].setValue(member.facebook);
        form.controls['line'].setValue(member.line);
        form.controls['macaddress'].setValue(member.macaddress);
        form.controls['role'].setValue(member.role);
        form.controls['password'].setValidators(this.validators.isPassword);
        form.controls['password'].updateValueAndValidity();
      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
      });
  }

}
