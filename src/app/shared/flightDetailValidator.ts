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

export function dateTimeValidatorDepart(controlName: string) {
  return (fg: FormGroup) => {
    const control = fg.controls[controlName];

    try {
      if (control.errors && !control.errors['invalidDateOrTime']) {
        return;
      }

      console.log(control.value);
      let ifSelected: String = control.value;

      if (ifSelected === null) return
      let DateTimePart = ifSelected.split('T');
      //For Date
      let inputDate = DateTimePart[0].split("-");
      let date = Number(inputDate[2]);
      let year = Number(inputDate[0]);
      let month = Number(inputDate[1]);
      //For Time
      let inputTime = DateTimePart[1].split(":");
      let hh = Number(inputTime[0]);
      let mm = Number(inputTime[1]);
     
      //For Current Date     
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth() + 1;
      let currentDate = new Date().getDate();

      //For Current Time
      let Cmm = new Date().getMinutes();
      let Chh = new Date().getHours();

      if (date < currentDate && month <= currentMonth && year <= currentYear) {
        control.setErrors({ invalidDateOrTime: true });
      }
      else if(Chh <= hh){
        if(Cmm > mm && hh == Chh){
          control.setErrors({invalidDateOrTime:true});
          return;
        }
        control.setErrors(null);
        return;
      }
    }
    catch (error: any) {
      const stackTraceError: any = new Error('Date parsing error');
      stackTraceError.stack = error.stack;
      console.error('Date parsing error:', stackTraceError);
    }
  }
}


export function dateTimeValidatorArrival(controlName: string, departurefield: string) {


  return (fg: FormGroup) => {
    const control = fg.controls[controlName];
    const departureDate = fg.controls[departurefield];

    try {
      if (control.errors && !control.errors['invalidTimeOfArrival']) {
        return;
      }

      console.log(departureDate.value);
      console.log(control.value)
      let ifSelected: String = control.value;

      if (ifSelected === null) return
      let DateTimePart = ifSelected.split('T');
      //For Date
      let inputDate = DateTimePart[0].split("-");
      let date = Number(inputDate[2]);
      let year = Number(inputDate[0]);
      let month = Number(inputDate[1]);
      //For Time
      let inputTime = DateTimePart[1].split(":");
      let hh = Number(inputTime[0]);
      let mm = Number(inputTime[1]);
     
      //For Current Date     
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth() + 1;
      let currentDate = new Date().getDate();

      //For Current Time
      let Cmm = new Date().getMinutes();
      let Chh = new Date().getHours();


      let departure = departureDate.value;
      if (departure === null)
        return;

      //console.log(departure)
      let departDateTimePart = departure.split('T');
      let depDate = departDateTimePart[0].split("-");
      let ddate = Number(depDate[2]);
      let dyear = Number(depDate[0]);
      let dmonth = Number(depDate[1]);

      let departTimePart = departDateTimePart[1].split(":");
      let Dhh = Number(departTimePart[0]);
      let Dmm = Number(departTimePart[1]);

      // const inputDateTime = new Date(year, month - 1, date, hh, mm);
      // const departureDateTime = new Date(dyear, dmonth - 1, ddate, Dhh, Dmm);
      // const currentDateTime = new Date(currentYear, currentMonth - 1, currentDate, Chh, Cmm);
      // console.log(departureDateTime);
      // // Compare input date and time with departure and current date and time
      // if (inputDateTime < departureDateTime || inputDateTime < currentDateTime) {
      //   // Return a validation error if input date and time is not valid
      //    control.setErrors({invalidTimeOfArrival:true});
      // }
  
      // else {
      //   control.setErrors(null);
      // }
    }

    catch (error: any) {
      const stackTraceError: any = new Error('Date parsing error');
      stackTraceError.stack = error.stack;
      console.error('Date parsing error:', stackTraceError);
    }
  }
}


