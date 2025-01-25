using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public class PassengerDetails
    {
        public int PassengerId { get; set; }
        public long PnrNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string AadharNo { get; set; }
    }
}
