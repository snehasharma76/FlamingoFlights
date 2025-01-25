using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL
{
    public class ConnectionString
    {
        public static string GetConnectionString()
        {
            // Using Configuration manager to fetch the connection string.
            return ConfigurationManager.ConnectionStrings["FlamingoDB"].ConnectionString;
        }
    }
}
