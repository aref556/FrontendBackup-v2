import { FormGroup } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

export interface IProfileAdminComponent {
    form: FormGroup;
    modalRef: BsModalRef;

    onSubmit(): void;
    onConvertImage(inputFile: HTMLInputElement): void;
    openModal(template: TemplateRef<any>);
}

export interface IProfileAdmin {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    telphone: string;
    facebook: string;
    line: string;
    // address: string;
    image: string;
}