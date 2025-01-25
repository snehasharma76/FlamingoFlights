using SOTI.Capstone.FlamingoDAL.Interfaces;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Methods
{
    public class CardInfoTable : ICardInfo
    {
        private SqlConnection con = null;
        private SqlDataAdapter adapter = null;
        private DataTable dt = null;
        public bool ValidateCardDetails(CardInfo card)
        {
            int result;
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (SqlCommand command = new SqlCommand("usp_ValidateCardDetails", con))
                {
                    SqlParameter returnValueParam = new SqlParameter("@result", SqlDbType.Int);
                    returnValueParam.Direction = ParameterDirection.Output;
                    command.Parameters.Add(returnValueParam);
                    using (adapter = new SqlDataAdapter(command))
                    {
                        adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        adapter.SelectCommand.Parameters.AddWithValue("@CardType", card.CardType);
                        adapter.SelectCommand.Parameters.AddWithValue("@CardNumber", card.CardNumber);
                        adapter.SelectCommand.Parameters.AddWithValue("@Cvv", card.Cvv);
                        adapter.SelectCommand.Parameters.AddWithValue("@ExpiryDate", card.ExpiryDate);
                        using (dt = new DataTable())
                        {
                            adapter.Fill(dt);
                        }
                        result = Convert.ToInt32(returnValueParam.Value);
                    }
                }
            }
            return result == 0 ? false : true;
        }
    }
}
