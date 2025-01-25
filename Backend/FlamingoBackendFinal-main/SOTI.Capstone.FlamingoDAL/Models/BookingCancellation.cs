using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public class BookingCancellation
    {
        public int PnrNo { get; set; }
        public int FlightId { get; set; }
        public char RefundStatus { get; set; }
        public int RefundAmount { get; set; }
    }
}
