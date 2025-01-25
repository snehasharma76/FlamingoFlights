using Microsoft.Win32;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Interfaces
{
    public interface IRegister
    {
        bool AddRegistration(Register register);
        Register[] GetAllRegisterData();

        Task<Register> ValidateUserAsync(string emailId, string password);
    }
}
