import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { BookFlightService } from 'src/app/services/book-flight.service';

@Component({
  selector: 'app-flight-details-summary',
  templateUrl: './flight-details-summary.component.html',
  styleUrls: ['./flight-details-summary.component.scss']
})
export class FlightDetailsSummaryComponent implements OnInit {

  flight: Airline = new Airline();

  constructor(private getThisFlight: BookFlightService) { }

  ngOnInit(): void {
    try {
      this.flight = this.getThisFlight.getFlightData();
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }

  calculateTimeDifference(startTime: any, endTime: any) {
    try {
      startTime = startTime.replace('T', ' ');
      endTime = endTime.replace('T', ' ');

      const date1 = new Date(startTime);
      const date2 = new Date(endTime);

      // if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      //   throw new Error("Invalid date format");
      // }

      // Calculate the time difference in milliseconds
      const timeDifference = date2.getTime() - date1.getTime();
      // Calculate hours and minutes
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}hr : ${minutes}min`;
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return "";
    }
  }

  extractDayAndMonth(dateString: string): string {
    try {
      dateString = dateString.replace('T', ' ');
      const dateObj = new Date(dateString);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }

      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weekday = weekdays[dateObj.getDay()].slice(0, 3);
      const day = dateObj.getDate();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = monthNames[dateObj.getMonth()];
      return `${weekday}, ${day} ${month}`;
    } catch (error) {
      console.error('Error extracting day and month:', error);
      return "";
    }
  }
}
