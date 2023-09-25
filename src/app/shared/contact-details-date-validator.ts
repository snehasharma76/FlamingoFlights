import { FormGroup } from "@angular/forms";

export function DateValidatorContactDetails(controlName: string) {
    return (fg: FormGroup) => {
        const control = fg.controls[controlName];
        try {
            if (control.errors && !control.errors['invalidAge']) {
                return;
            }
            // let ifSelected: String = control.value;
            // if (ifSelected === null) return
            // let input = ifSelected.split("-");
            // let date = Number(input[2]);
            // let year = Number(input[0]);
            // let month = Number(input[1]);
            // let currentYear = new Date().getFullYear();
            // let currentMonth = new Date().getMonth() + 1;
            // let currentDate = new Date().getDate();

            // if (date > currentDate && month >= currentMonth && year >= currentYear) {
            //     control.setErrors({ invalidDate: true });
            // }
            if (control.value < 6) {
                control.setErrors({ invalidAge: true })
            }
            else {
                control.setErrors(null);
            }
        }
        catch (error: any) {
            const stackTraceError: any = new Error('Date parsing error');
            stackTraceError.stack = error.stack;
            // console.error('Date parsing error:', stackTraceError);
        }
    }
}