using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Models
{
    public class CardInfo
    {
        public string CardType { get; set; }
        public string CardNumber { get; set; }
        public int Cvv { get; set; }
        public string ExpiryDate { get; set; }
    }
}
