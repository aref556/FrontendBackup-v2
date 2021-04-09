import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsLocaleService, BsModalService, BsModalRef, PageChangedEvent } from 'ngx-bootstrap';
import { AppURL } from 'src/app/app.url';
import { IRoleAccount, IAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AuthURL } from '../../authentication.url';
import { MemberService } from '../../services/member.service';
import { IAdminMember, IAdminMemberSearch, IAdminMemberSearchKey, IAdminsMembersComponent } from './admins-members.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-admins-members',
  templateUrl: './admins-members.component.html',
  styleUrls: ['./admins-members.component.css'],
  providers: [MemberService]
})
export class AdminsMembersComponent implements IAdminsMembersComponent {

  constructor(
    private member: MemberService,
    private alert: AlertService,
    private detect: ChangeDetectorRef,
    private router: Router,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
) {
    // เปลี่ยน Datepicker เป็นภาษาไทย
    this.localeService.use('th');
    // โหลดข้อมูลสมาชิก
    this.initialLoadMembers({
        startPage: this.startPage,
        limitPage: this.limitPage
    });
    // กำหนดค่าเริ่มให้กับ searchType
    this.serachType = this.searchTypeItems[0];
}

    items: IAdminMember;
    modalRef: BsModalRef;
    UserLogin: IAccount;

    // ตัวแปรสำหรับค้นหา
    searchText: string = '';
    serachType: IAdminMemberSearchKey;
    searchTypeItems: IAdminMemberSearchKey[] = [
        { key: 'username', value: 'ค้นหาจากชื่อผู้ใช้' },
        { key: 'firstname', value: 'ค้นหาจากชื่อ' },
        { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
        { key: 'macaddress', value: 'ค้นหาจาก Mac address' },
        { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' },
        { key: 'updated', value: 'ค้นหาจากวันที่' }
    ];

    // ตัวแปร pagination 
    startPage: number = 1;
    limitPage: number = 10;

    // เปลี่ยนหน้า pagination
    onPageChanged(page: PageChangedEvent) {
      this.initialLoadMembers({
          searchText: this.getSearchText,
          searchType: this.serachType.key,
          startPage: page.page,
          limitPage: page.itemsPerPage
      });
  }

  // ค้นหาข้อมูล
  onSearchItem() {
      this.startPage = 1;
      this.initialLoadMembers({
          searchText: this.getSearchText,
          searchType: this.serachType.key,
          startPage: this.startPage,
          limitPage: this.limitPage
      });
      // กระตุ้น Event
      this.detect.detectChanges();
  }

  // แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
      return IRoleAccount[role];
  }

  // ลบข้อมูลสมาชิก
  onDeleteMember(item: IAccount) {
      this.alert.confirm().then(status => {
          if (!status) return;
          this.member
              .deleteMember(item.id)
              .then(() => {
                  // โหลดข้อมูล Member ใหม่
                  this.initialLoadMembers({
                      searchText: this.getSearchText,
                      searchType: this.serachType.key,
                      startPage: this.startPage,
                      limitPage: this.limitPage
                  });
                  this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
              })
              .catch(err => this.alert.notify(err.Message));
      });
  }

  onShowKey(item: IAccount) {
      this.alert.showRsaKey(item.rsakey);
  }

  // แก้ไขข้อมูลสมาชิกโดยส่ง id ไปยัง url
  onUpdateMember(item: IAccount) {
      this.router.navigate(['',
          AppURL.Authen,
          AuthURL.AdminCreate,
          item.id
      ]);
  }

  // เปิด Modal dialog
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  // ตรวจสอบและ return ค่า searchText
  private get getSearchText() {
      let responseSearchText = null;
      switch (this.serachType.key) {
          case 'role':
              responseSearchText = IRoleAccount[this.searchText] || '';
              break;
          case 'updated':
              try {
                  const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] } as any;
                  if (searchDate == undefined || searchDate.to == undefined)
                      return this.alert.notify('กรุณาเลือกวันที่', 'warning');
                  searchDate.from.setHours(0);
                  searchDate.from.setMinutes(0);
                  searchDate.from.setSeconds(0);
                  searchDate.to.setHours(23);
                  searchDate.to.setMinutes(59);
                  searchDate.to.setSeconds(59);
                  responseSearchText = searchDate;
              }
              catch (ex) {
                  this.alert.notify(`เกิดข้อผิดพลาด ${ex.message}`, 'warning');
              }
              break;
          default:
              responseSearchText = this.searchText;
              break;
      }
      return responseSearchText;
  }

  // โหลดข้อมูลสมาชิก
  // private initialLoadMembers(options?: IAdminMemberSearch) {
  //     this.member
  //         .getsuperMembers(options)
  //         .then(items => this.items = items)
  //         .catch(err => this.alert.notify(err.Message));
  // }

  // โหลดข้อมูลสมาชิก
  private initialLoadMembers(options?: IAdminMemberSearch) {
    this.member
        .getMembers(options)
        .then(items => {
            this.items = items;
            this.items.items = _.filter(items.items, ['role', 1]);
            this.items.totalItems = this.items.items.length;
        })
        .catch(err => this.alert.notify(err.Message));
}

}
