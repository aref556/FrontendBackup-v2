import { IRoleAccount } from '../../../shareds/services/account.service';
import { FormGroup } from '@angular/forms';
export interface IMemberCreateComponent {
    form: FormGroup;
    memId: any;
    roleItems: IRoleAccount[];

    onSubmit(): void;
    getRoleName(role: IRoleAccount): string;
    onConvertImage(input: HTMLInputElement);
}