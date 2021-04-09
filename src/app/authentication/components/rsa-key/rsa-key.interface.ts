import { FormGroup } from '@angular/forms';

export interface IRsaKeyComponent {
    form: FormGroup;
    onSubmit(): void;
}

export interface IRsaKey {
    rsakey: string;
}