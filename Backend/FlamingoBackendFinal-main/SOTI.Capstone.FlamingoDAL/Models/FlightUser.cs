using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public class FlightUser
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime TimeOfDeparture { get; set; }
        public int NumberOfPassengers { get; set; }
    }
}
