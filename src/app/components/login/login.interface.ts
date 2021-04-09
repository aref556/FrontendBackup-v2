import { FormGroup } from '@angular/forms';

export interface ILoginComponent {
    Url: any;
    returnURL: string;
    form: FormGroup;

    onSubmit(): void;
}

export interface ILogin {
    username: string;
    password: string;
}