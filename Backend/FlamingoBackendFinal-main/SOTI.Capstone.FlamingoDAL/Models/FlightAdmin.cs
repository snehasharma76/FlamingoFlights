using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public class FlightAdmin
    {
        public int FlightId { get; set; }
        public string FlightName { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime TimeOfDeparture { get; set; }
        public DateTime TimeOfArrival { get; set; }
        public int KmsTravel { get; set; }
        public string DaysOfFlight { get; set; }
        public int StartingFarePerSeat { get; set; }
        public int TotalNumberOfSeats { get; set; }
        public int SeatsBooked { get; set; }
        public char BreakFlight { get; set; }
    }
}
