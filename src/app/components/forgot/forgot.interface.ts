import { FormGroup } from "@angular/forms";

export interface IForgotComponent {
    form: FormGroup;
    Url: any;

    onSubmit();
}

export interface IForgot {
    username: string;
    macaddress: string;
    newpassword: string;
    cpassword: string;
}