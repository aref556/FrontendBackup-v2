import { FormGroup } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

export interface IProfileComponent {
    form: FormGroup;
    modalRef: BsModalRef;

    onSubmit(): void;
    onConvertImage(inputFile: HTMLInputElement): void;
    openModal(template: TemplateRef<any>);
}

export interface IProfile {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    telphone: string;
    facebook: string;
    line: string;
    image: string;
}