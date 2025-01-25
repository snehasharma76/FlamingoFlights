using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public class BookingFlights
    {
        public long PnrNo { get; set; }
        public DateTime BookingDate { get; set; }
        public int FlightId { get; set; }
        public DateTime FlightDate { get; set; }
        public int NumberOfPassengers { get; set; }
        public decimal RatePerSeat { get; set; }
        public string PaymentMode { get; set; }
        public int CustomerId { get; set; }
    }
}
