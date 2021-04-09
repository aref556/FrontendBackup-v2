import { TemplateRef } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap";
import { IRoleAccount, IAccount } from "src/app/shareds/services/account.service";
import { IMember, IMemberSearchKey } from "../members/members.interface";

export interface IAdminsMembersComponent {
    items: IMember;

    // ส่วนของการค้นหา
    searchText: string;
    serachType: IMemberSearchKey;
    searchTypeItems: IMemberSearchKey[];
    onSearchItem(): void;

    // ส่วนของ pagination
    startPage: number;
    limitPage: number;
    onPageChanged(page: PageChangedEvent);

    getRoleName(role: IRoleAccount): string;
    onDeleteMember(item: IAccount): void;
    onUpdateMember(item: IAccount): void;

    openModal(template: TemplateRef<any>);
}

export interface IAdminMember {
    items: IAccount[];
    totalItems: number;
}

export interface IAdminMemberSearch {
    searchText?: string;
    searchType?: string;

    startPage: number;
    limitPage: number;
}

export interface IAdminMemberSearchKey {
    key: string;
    value: string;
}