import { FormGroup } from '@angular/forms';

export function CheckSeatLimit(controlName: string) {
  return (fg: FormGroup) => {
    const control = fg.controls[controlName];
    try {
      if (control.errors && !control.errors['notmatched']) {
        return;
      }
      if (control.value <= 0 || control.value > 5) {
        control.setErrors({ notmatched: true });
      }
      else {
        control.setErrors(null);
      }
    }
    catch (error: any) {
      const stackTraceError: any = new Error('Invalid no. of seats passed');
      stackTraceError.stack = error.stack;
      console.error('Seats Invalid:', stackTraceError);
    }
  }

}

export function dateValidatorDepart(controlName: string) {
  return (fg: FormGroup) => {
    const control = fg.controls[controlName];

    try {
      if (control.errors && !control.errors['invalidDate']) {
        return;
      }

      let ifSelected: String = control.value;

      if (ifSelected === null) return
      let input = ifSelected.split("-");
      let date = Number(input[2]);
      let year = Number(input[0]);
      let month = Number(input[1]);

      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth() + 1;
      let currentDate = new Date().getDate();

      if (date < currentDate && month <= currentMonth && year <= currentYear) {
        control.setErrors({ invalidDate: true });
      }
      else {
        control.setErrors(null);
      }
    }
    catch (error: any) {
      const stackTraceError: any = new Error('Date parsing error');
      stackTraceError.stack = error.stack;
      console.error('Date parsing error:', stackTraceError);
    }
  }
}


export function dateValidatorReturn(controlName: string, departurefield: string) {


  return (fg: FormGroup) => {
    const control = fg.controls[controlName];
    const departureDate = fg.controls[departurefield];

    try {
      if (control.errors && !control.errors['invalidDate'] && !control.errors['matchedWithDepartDate']) {
        return;
      }

      let ifSelected: String = control.value;

      if (ifSelected === null) return
      let input = ifSelected.split("-");
      let date = Number(input[2]);
      let year = Number(input[0]);
      let month = Number(input[1]);

      let departure = departureDate.value;
      if (departure === null)
        return;

      //console.log(departure)
      departure = departure.split('-');

      let departDate = Number(departure[2]);
      let departMonth = Number(departure[1]);
      let departYear = Number(departure[0]);

      if (month >= departMonth && year >= departYear) {
        if (date <= departDate && month == departMonth && year == departYear) {
          control.setErrors({ matchedWithDepartDate: true });
          return;
        }
        else if (month >= departMonth && year >= departYear) {
          control.setErrors(null);
          return;
        }
        else {
          control.setErrors({ invalidDate: true });
          return;
        }
      }
      else {
        control.setErrors({ invalidDate: true });
      }
    }

    catch (error: any) {
      const stackTraceError: any = new Error('Date parsing error');
      stackTraceError.stack = error.stack;
      console.error('Date parsing error:', stackTraceError);
    }
  }
}

export function originDesinationNotSame(origin: string, destination: string) {
  return (fg: FormGroup) => {
    const originControl = fg.controls[origin];
    const destinationControl = fg.controls[destination];
    try {
      if ((destinationControl.errors && !destinationControl.errors['sameLocation']) || originControl.value == null) {
        return;
      }

      let selectedOrigin: string = originControl.value;
      let selectedDestination: string = destinationControl.value;

      if (selectedOrigin == selectedDestination) {
        destinationControl.setErrors({ sameLocation: true });
        return;
      }
      else
        destinationControl.setErrors(null);
      return;
    }
    catch (error: any) {
      const stackTraceError: any = new Error('LocationSameError');
      stackTraceError.stack = error.stack;
      console.error('Orgin And Destination Can not be Same:', stackTraceError);
    }
  }
}
