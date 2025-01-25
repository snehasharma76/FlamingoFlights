using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Interfaces
{
    public interface IPassengerDetails
    {
        List<PassengerDetails> GetAllPassengerDetails();
        int AddPassengerDetails(PassengerDetails passenger);
        int RemovePassenger(int passengerId);
    }
}
