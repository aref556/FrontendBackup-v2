import { Injectable } from '@angular/core';
import { ILogin } from '../../components/login/login.interface';
import { IProfile } from '../../authentication/components/profile/profile.interface';
import { IChangePassword } from '../../authentication/components/profile/change-password/change-password.interface';
import { IForgot } from 'src/app/components/forgot/forgot.interface';

import { HttpService } from 'src/app/services/http.service';
import { IRsaKey } from 'src/app/authentication/components/rsa-key/rsa-key.interface';
import { IAddress } from 'src/app/authentication/components/address/address.interface';
@Injectable({
    providedIn: 'root'
})
export class AccountService { // Service นี้คือ Global service

    constructor(
        private http: HttpService
    ) { }

    public mockUserItems: IAccount[] = [
        {
            id: 1,
            username: 'psu001',
            firstname: '',
            lastname: '',
            telphone: '',
            email: '',
            facebook: '',
            line: '',
            // address: '',
            password: '111111',
            // email: 'psu001@mail.com',
            // address: 'คณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ หาดใหญ่ ต.คอหงส์, Kho Hong, Hat Yai District, Songkhla 90112',
            macaddress: '00:1B:44:11:3A:B7',
            hashmac: 'Sha1$12345',
            rsakey: '',
            flagrsa: false,
            image: null,
            role: IRoleAccount.Member,
            created: new Date(),
            updated: new Date(),
            latitude: '',
            longitude: '',
            organization: '',
            num: '',
            subdistrict: '',
            district: '',
            province: '',
            zipcode: '',
        },
        {
            id: 2,
            username: 'Admin',
            firstname: 'Admin1',
            lastname: 'S',
            telphone: '',
            email: '',
            facebook: '',
            line: '',
            // address: '456 Songkhla',
            password: '123456',
            macaddress: '',
            // macaddress: '43:1B:44:12:3A:B8',
            hashmac: 'Sha1$67890',
            rsakey: 'Sha1$test-rsa-admin',
            flagrsa: false,
            image: null,
            role: IRoleAccount.Admin,
            created: new Date(),
            updated: new Date(),
            latitude: 'string',
            longitude: 'string',
            organization: 'string',
            num: 'string',
            subdistrict: 'string',
            district: 'string',
            province: 'string',
            zipcode: 'string',
        },
        {
            id: 0,
            username: 'super',
            firstname: 'Super',
            lastname: 'Admin',
            telphone: '',
            email: '',
            facebook: '',
            line: '',
            // address: '456 Songkhla',
            password: '222222',
            macaddress: '',
            // macaddress: '43:1B:44:12:3A:B8',
            hashmac: 'Sha1$67890',
            rsakey: 'Sha1$test-rsa-admin',
            flagrsa: false,
            image: null,
            role: IRoleAccount.SuperAdmin,
            created: new Date(),
            updated: new Date(),
            latitude: 'string',
            longitude: 'string',
            organization: 'string',
            num: 'string',
            subdistrict: 'string',
            district: 'string',
            province: 'string',
            zipcode: 'string',
        },
    ];

    // store user login ไว้
    public UserLogin: IAccount = {} as any;
    public setUserLogin(userLogin: IAccount) {
        this.UserLogin.id = userLogin.id;
        this.UserLogin.username = userLogin.username;
        this.UserLogin.firstname = userLogin.firstname;
        this.UserLogin.lastname = userLogin.lastname;
        this.UserLogin.telphone = userLogin.telphone;
        this.UserLogin.email = userLogin.email;
        this.UserLogin.facebook = userLogin.facebook;
        this.UserLogin.line = userLogin.line;
        this.UserLogin.password = userLogin.password;
        this.UserLogin.macaddress = userLogin.macaddress;
        this.UserLogin.hashmac = userLogin.hashmac;
        this.UserLogin.rsakey = userLogin.rsakey;
        this.UserLogin.flagrsa = userLogin.flagrsa;
        this.UserLogin.image = userLogin.image;
        this.UserLogin.role = userLogin.role;
        this.UserLogin.latitude = userLogin.latitude;
        this.UserLogin.longitude = userLogin.longitude;
        this.UserLogin.organization = userLogin.organization;
        this.UserLogin.num = userLogin.num;
        this.UserLogin.subdistrict = userLogin.subdistrict;
        this.UserLogin.district = userLogin.district;
        this.UserLogin.province = userLogin.province;
        this.UserLogin.zipcode = userLogin.zipcode;
        this.UserLogin.created = userLogin.created;
        this.UserLogin.updated = userLogin.updated;
        return this.UserLogin;
    }

    //  เปลี่ยนรหัสผ่านใหม่
    onChangePassword(accessToken: string, model: IChangePassword) {
        return this.http
            .requestPost('api/member/change-password', model, accessToken)
            .toPromise() as Promise<IAccount>;
        // return new Promise((resolve, reject) => {
        //     const userProfile = this.mockUserItems.find(item => item.id == accessToken);
        //     if (!userProfile) return reject({ Message: 'ไม่มีข้อมูลผู้ใช้งาน' });
        //     if (userProfile.password !== model.old_pass) return reject({ Message: 'รหัสผ่านเดิมไม่ถูกต้อง' });
        //     userProfile.password = model.new_pass;
        //     userProfile.updated = new Date();
        //     resolve(userProfile);
        // });
    }

    // แก้ไขข้อมูลส่วนตัว Update profile
    onUpdateProfile(accessToken: string, model: IProfile) {
        return (this.http
            .requestPost('api/member/profile', model, accessToken)
            .toPromise() as Promise<IAccount>)
            .then(user => this.setUserLogin(user));
    }

    // แก้ไขที่อยู่ Update profile
    onUpdateAddress(accessToken: string, model: IAddress) {
        return (this.http
            .requestPost('api/member/address', model, accessToken)
            .toPromise() as Promise<IAccount>)
            .then(user => this.setUserLogin(user));
        // return new Promise((resolve, reject) => {
        //     const userProfile = this.mockUserItems.find(user => user.id == accessToken);
        //     if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
        //     userProfile.latitude = model.latitude;
        //     userProfile.longitude = model.longitude;
        //     userProfile.organization = model.organization;
        //     userProfile.num = model.num;
        //     userProfile.subdistrict = model.subdistrict;
        //     userProfile.district = model.district;
        //     // userProfile.address = model.address;
        //     userProfile.province = model.province;
        //     userProfile.zipcode = model.zipcode;
        //     resolve(userProfile);
        // });
    }

    // แก้ไขกุญแจ Update RSA KEY
    onUpdateRSA(accessToken: string, model: IRsaKey) {
        // console.log(model.rsakey);
        return (this.http
            .requestPost('api/member/rsa-key', model, accessToken)
            .toPromise() as Promise<IAccount>)
            .then(user => this.setUserLogin(user));
        // return new Promise((resolve, reject) => {
        //     const userProfile = this.mockUserItems.find(user => user.id == accessToken);
        //     if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
        //     userProfile.rsakey = model.rsakey;
        //     userProfile.flagrsa = true;
        //     userProfile.updated = new Date();
        //     resolve(userProfile);
        // });
    }

    // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
    getUserLogin(accessToken: string) {
        return (this.http
            .requestGet('api/member/data', accessToken)
            .toPromise() as Promise<IAccount>)
            .then(userLogin => this.setUserLogin(userLogin));
        // return new Promise<IAccount>((resolve, reject) => {
        //     const userLogin = this.mockUserItems.find(m => m.id == accessToken);
        //     if (!userLogin) return reject({ Message: 'accessToken ไม่ถูกต้อง' });
        //     resolve(userLogin);
        // });
    }

    // เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return this.http
            .requestPost('api/account/login', model)
            .toPromise() as Promise<{ accessToken: string }>;
        // return new Promise<{ accessToken: string }>((resolve, reject) => {
        //     const userLogin = this.mockUserItems.find(item => item.username == model.username && item.password == model.password);
        //     if (!userLogin) return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
        //     resolve({
        //         accessToken: userLogin.id
        //     });
        // });
    }

    // รีเซ็ต password
    onForgot(model: IForgot) {
        // return new Promise((resolve, reject) => { })
        return this.http
            .requestPost('api/account/forgot-password', model)
            .toPromise() as Promise<IAccount>;
    }

    // ลงทะเบียน
    // onRegister(model: IRegister) {
    // return new Promise((resolve, reject) => {
    //     const _model: IAccount = model;
    //     _model.id = Math.random();
    //     _model.image = null;
    //     _model.position = '';
    //     _model.role = IRoleAccount.Member;
    //     _model.created = new Date();
    //     _model.updated = new Date();
    //     this.mockUserItems.push(model);
    //     resolve(model);
    // });
    // }

}

export interface IAccount {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    telphone: string;
    facebook: string;
    line: string;
    macaddress: string;
    hashmac: string;
    password: string;
    rsakey: string;
    flagrsa: boolean;
    latitude: string;
    longitude: string;
    organization: string;
    num: string;
    subdistrict: string;
    district: string;
    province: string;
    zipcode: string;

    id?: any;
    // position?: string;
    image?: string;
    role?: IRoleAccount;
    created?: Date;
    updated?: Date;
}

export enum IRoleAccount {
    Member = 1,
    // Employee,
    Admin,
    SuperAdmin
}