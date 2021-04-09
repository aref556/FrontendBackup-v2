import { Injectable } from "@angular/core";
import { AuthenService } from "src/app/services/authen.service";
import { HttpService } from "src/app/services/http.service";
import { AccountService, IAccount, IRoleAccount } from '../../shareds/services/account.service';
import { IAdminMember, IAdminMemberSearch } from "../components/admins-members/admins-members.interface";
import { IMemberSearch, IMember } from '../components/members/members.interface';

declare let $;

@Injectable()
export class MemberService {
    constructor(
        private account: AccountService,
        private http: HttpService,
        private authen: AuthenService) {
        // if (this.account.mockUserItems.length <= 2)
            // this.generateMembers();
    }

    // ดึงข้อมูลสมาชิกทังหมด
    getMembers(options?: IMemberSearch) {
        return this.http
            .requestGet(`api/member?${$.param(options)}`, this.authen.getAuthenticated())
            .toPromise() as Promise<IMember>;
        // return new Promise<IMember>((resolve, reject) => {
        //     // เรียงลำดับข้อมูลใหม่จาก วันที่แก้ไขล่าสุด
        //     let items = this.account.mockUserItems.sort((a1, a2) => {
        //         return Date.parse(a2.updated.toString()) - Date.parse(a1.updated.toString());
        //     });

        //     // คำนวนเรื่อง Pagination
        //     const startItem = (options.startPage - 1) * options.limitPage;
        //     const endItem = options.startPage * options.limitPage;

        //     // หากมีการค้นหาข้อมูล
        //     if (options && options.searchText && options.searchType) {
        //         // ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
        //         items = this.account
        //             .mockUserItems
        //             .filter(item => {
        //                 switch (options.searchType) {
        //                     case 'updated':
        //                         return item.updated >= options.searchText['from'] && item.updated <= options.searchText['to'];
        //                     default:
        //                         return item[options.searchType].toString().toLowerCase()
        //                             .indexOf(options.searchText.toString().toLowerCase()) >= 0
        //                 }
        //             });
        //     }
        //     resolve({ items: items.slice(startItem, endItem), totalItems: items.length });
        // });
    }

    // getsuperMembers(options?: IAdminMemberSearch) {
    //     return new Promise<IAdminMember>((resolve, reject) => {
    //         // เรียงลำดับข้อมูลใหม่จาก วันที่แก้ไขล่าสุด
    //         let items = this.account.mockUserItems.sort((a1, a2) => {
    //             return Date.parse(a2.updated.toString()) - Date.parse(a1.updated.toString());
    //         });

    //         // คำนวนเรื่อง Pagination
    //         const startItem = (options.startPage - 1) * options.limitPage;
    //         const endItem = options.startPage * options.limitPage;

    //         // หากมีการค้นหาข้อมูล
    //         if (options && options.searchText && options.searchType) {
    //             // ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
    //             items = this.account
    //                 .mockUserItems
    //                 .filter(item => {
    //                     switch (options.searchType) {
    //                         case 'updated':
    //                             return item.updated >= options.searchText['from'] && item.updated <= options.searchText['to'];
    //                         default:
    //                             return item[options.searchType].toString().toLowerCase()
    //                                 .indexOf(options.searchText.toString().toLowerCase()) >= 0
    //                     }
    //                 });
    //         }
    //         resolve({ items: items.slice(startItem, endItem), totalItems: items.length });
    //     });
    // }

    // ดึงข้อมูลสมาชิกแค่คนเดียว
    getMemberById(id) {
        return this.http
            .requestGet(`api/member/${id}`, this.authen.getAuthenticated())
            .toPromise() as Promise<IAccount>;
        // return new Promise<IAccount>((resolve, reject) => {
        //     const member = this.account.mockUserItems.find(item => item.id == id);
        //     if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' });
        //     resolve(member);
        // });
    }

    // เพิ่มข้อมูลสมาชิก
    createMemeber(model: IAccount) {
        return this.http
            .requestPost('api/member', model, this.authen.getAuthenticated())
            .toPromise() as Promise<IAccount>;
        // return new Promise<IAccount>((resolve, reject) => {
        //     if (this.account.mockUserItems.find(item => item.username == model.username))
        //         return reject({ Message: 'ชื่อผู้ใช้นี้มีในระบบแล้ว' });
        //     model.id = Math.random();
        //     model.created = new Date();
        //     model.updated = new Date();
        //     this.account.mockUserItems.push(model);
        //     resolve(model);
        // });
    }

    // ลบข้อมูลสมาชิก
    deleteMember(id: any) {
        return this.http
            .requestDelete(`api/member/${id}`, this.authen.getAuthenticated())
            .toPromise() as Promise<number>;
        // return new Promise((resolve, reject) => {
        //     const findIndex = this.account.mockUserItems.findIndex(item => item.id == id);
        //     if (findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลนี้ในระบบ' });
        //     resolve(this.account.mockUserItems.splice(findIndex, 1));
        // });
    }

    // แก้ไขสมาชิก
    updateMember(id: any, model: IAccount) {
        return this.http
            .requestPut(`api/member/${id}`, model, this.authen.getAuthenticated())
            .toPromise() as Promise<IAccount>;
        // return new Promise<IAccount>((resolve, reject) => {
        //     const member = this.account.mockUserItems.find(item => item.id == id);
        //     if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' });
        //     // ตรวจสอบว่ามีอีเมล์นี้ในระบบหรือยัง
        //     if (this.account.mockUserItems.find(item => {
        //         return item.email == model.email && model.email != member.email;
        //     })) return reject({ Message: 'มีอีเมล์นี้อยู่ในระบบแล้ว' });

        //     member.username = model.username;
        //     member.email = model.email;
        //     member.password = model.password || member.password; // หากไม่กรอก password ก็ใช้ตัวเดิม
        //     member.firstname = model.firstname;
        //     member.lastname = model.lastname;
        //     member.macaddress = model.macaddress;
        //     member.role = model.role;
        //     member.image = model.image;
        //     member.updated = new Date();
        //     resolve(member);
        // });
    }

    // จำลองข้อมูลสมาชิก เพื่อทำ pagination
    // private generateMembers() {
    //     // const positions = ['Frontend Developer', 'Backend Developer'];
    //     // const roles = [IRoleAccount.Member, IRoleAccount.Employee, IRoleAccount.Admin];
    //     const roles = [IRoleAccount.Member, IRoleAccount.Admin,IRoleAccount.SuperAdmin];
    //     for (let i = 4; i <= 9; i++)
    //         this.account.mockUserItems.push({
    //             id: i.toString(),
    //             username: `psu00${i}`,
    //             firstname: `Firstname ${i}`,
    //             lastname: `Lastname ${i}`,
    //             email: `mail-${i}@mail.com`,
    //             telphone: '09823456789',
    //             facebook: '',
    //             line: '',
    //             // address: `123`,
    //             macaddress: `test`,
    //             hashmac: `123`,
    //             password: `123456`,
    //             rsakey: `test00${i}`,
    //             flagrsa: false,
    //             role: 1,
    //             created: new Date(),
    //             updated: new Date(),
    //             latitude: 'string',
    //             longitude: 'string',
    //             organization: 'string',
    //             num: 'string',
    //             subdistrict: 'string',
    //             district: 'string',
    //             province: 'string',
    //             zipcode: 'string',
    //         });
    //     for (let i = 10; i <= 40; i++)
    //         this.account.mockUserItems.push({
    //             id: i.toString(),
    //             username: `psu0${i}`,
    //             firstname: `Firstname ${i}`,
    //             lastname: `Lastname ${i}`,
    //             email: `mail-${i}@mail.com`,
    //             telphone: '09823456789',
    //             facebook: '',
    //             line: '',
    //             // address: `123`,
    //             macaddress: `123`,
    //             hashmac: `123`,
    //             password: '123456',
    //             rsakey: `test0${i}`,
    //             flagrsa: false,
    //             role: 1,
    //             created: new Date(),
    //             updated: new Date(),
    //             latitude: 'string',
    //             longitude: 'string',
    //             organization: 'string',
    //             num: 'string',
    //             subdistrict: 'string',
    //             district: 'string',
    //             province: 'string',
    //             zipcode: 'string',
    //         });
    // }
}