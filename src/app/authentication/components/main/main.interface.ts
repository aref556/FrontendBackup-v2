import { FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap";

export interface IMainComponent {
    form: FormGroup;
    modalRef: BsModalRef;
}

export interface IMain {
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