import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { RsaKeyComponent } from './components/rsa-key/rsa-key.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';
import { MainComponent } from './components/main/main.component';
import { AddressComponent } from './components/address/address.component';
import { AdminCreateComponent } from './components/admin-create/admin-create.component';
import { AdminsMembersComponent } from './components/admins-members/admins-members.component';
import { AdminsComponent } from './components/admins/admins.component';

@NgModule({
    imports: [
        CommonModule,
        AuthenticationRouting,
        SharedsModule
    ],
    declarations: [
        DashboardComponent,
        ProfileComponent,
        MembersComponent,
        MemberCreateComponent,
        ChangePasswordComponent,
        RsaKeyComponent,
        ProfileAdminComponent,
        MainComponent,
        AddressComponent,
        AdminCreateComponent,
        AdminsMembersComponent,
        AdminsComponent,
    ]
})
export class AuthenticationModule { }
