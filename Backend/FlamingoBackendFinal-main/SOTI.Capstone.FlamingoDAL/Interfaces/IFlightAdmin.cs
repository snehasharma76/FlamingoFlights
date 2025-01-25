using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Interfaces
{
    public interface IFlightAdmin
    {
        //declare all the crud operations here
        bool AddFlightDetails(FlightAdmin flight);
        bool UpdateFlightDetails(int flightId, FlightAdmin flight);
        bool DeleteFlightDetails(int flightId);
        List<FlightAdmin> GetAllFlights();
        FlightAdmin GetFlightById(int flightId);
    }
}
