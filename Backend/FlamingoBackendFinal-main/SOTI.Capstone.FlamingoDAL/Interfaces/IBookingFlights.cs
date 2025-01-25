using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public interface IBookingFlights
    {

        int AddFlightBooking(BookingFlights bookflight);
        List<BookingFlights> GetAllFlights(string emailId);
        int DeleteFlightBooking(long pnrNo);
    }
}
