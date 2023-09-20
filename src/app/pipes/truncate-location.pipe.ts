import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateLocation'
})
export class TruncateLocationPipe implements PipeTransform {

  transform(location: string): string {
    if (location && location.length > 3) {
      return `${location.substring(0, 3).toUpperCase()}`;
    } else {
      return location.toUpperCase();
    }
  }

}
