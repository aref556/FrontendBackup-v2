import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../shareds/services/account.service';
import { RsaKeyComponent } from './components/rsa-key/rsa-key.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';
import { MainComponent } from './components/main/main.component';
import { AddressComponent } from './components/address/address.component';
import { AdminCreateComponent } from './components/admin-create/admin-create.component';
import { AdminsMembersComponent } from './components/admins-members/admins-members.component';

const RouteLists: Routes = [
    { path: '', redirectTo: AuthURL.Main, pathMatch: 'full' },

    { path: AuthURL.Main, component: MainComponent },

    {
        path: AuthURL.RSA, component: RsaKeyComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Member] },
    },
    // {
    //     path: AuthURL.Dashboard, component: DashboardComponent,
    //     canActivate: [UserRoleGuard],
    //     data: { roles: [IRoleAccount.Member] },
    // },

    {
        path: AuthURL.Profile, component: ProfileComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Member] },
    },

    {
        path: AuthURL.Address, component: AddressComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Member] },
    },

    {
        path: AuthURL.ProfileAdmin, component: ProfileAdminComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin,IRoleAccount.SuperAdmin] },
    },

    {
        path: AuthURL.Member, component: MembersComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin] },
    },

    {
        path: AuthURL.AdminMember, component: AdminsMembersComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.SuperAdmin] },
    },

    {
        path: AuthURL.MemberCreate,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin,IRoleAccount.SuperAdmin] },
        children: [
            { path: '', component: MemberCreateComponent },
            { path: ':id', component: MemberCreateComponent },
        ]
    },

    {
        path: AuthURL.AdminCreate,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin,IRoleAccount.SuperAdmin] },
        children: [
            { path: '', component: AdminCreateComponent },
            { path: ':id', component: AdminCreateComponent },
        ]
    }
];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);