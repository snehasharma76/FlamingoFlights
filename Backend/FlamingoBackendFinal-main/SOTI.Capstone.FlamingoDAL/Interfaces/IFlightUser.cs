using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Interfaces
{
    public interface IFlightUser
    {
       List<FlightAdmin> SearchFlights(FlightUser userSearch); 
    }
}
