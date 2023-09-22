import { FormGroup } from '@angular/forms';

// Custom validator function for Aadhar number length

export function AadharValidation(controlName: string) {
    return (fg: FormGroup) => {
        const control = fg.controls[controlName];
        const aadharNo = control.value ? control.value.toString() : '';

        if (control.errors && !control.errors['invalidLength']) {
            return;
        }

        if (aadharNo.length !== 12) {
            control.setErrors({ invalidLength: true });
        }
        else {
            control.setErrors(null);
        }
    }
}