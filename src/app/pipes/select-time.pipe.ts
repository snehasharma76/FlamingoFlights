import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectTime'
})
export class SelectTimePipe implements PipeTransform {

  transform(dateTime: string): string {
      return `${dateTime.split('T')[1].slice(0,5)}`
  }

}
