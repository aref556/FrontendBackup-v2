import { FormGroup } from "@angular/forms";

export interface IAddressComponent {
    form: FormGroup;
    onSubmit(): void;
}

export interface IAddress {
    latitude: string;
    longitude: string;
    organization: string;
    num: string;
    subdistrict: string;
    district: string;
    province: string;
    zipcode: string;
}