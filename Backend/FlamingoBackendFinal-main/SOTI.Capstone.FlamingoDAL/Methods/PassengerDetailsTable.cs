using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SOTI.Capstone.FlamingoDAL.Interfaces;

namespace SOTI.Capstone.FlamingoDAL.Methods
{
    public class PassengerDetailsTable:IPassengerDetails
    {
        private SqlConnection con = null;
        private SqlCommand cmd = null;
        private SqlDataReader reader = null;
        public int AddPassengerDetails(PassengerDetails passenger)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_AddPassengerDetails", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@pnrNo", SqlDbType.BigInt, 8)).Value = passenger.PnrNo;
                    cmd.Parameters.Add(new SqlParameter("@firstName", SqlDbType.VarChar, 30)).Value = passenger.FirstName;
                    cmd.Parameters.Add(new SqlParameter("@lastName", SqlDbType.VarChar, 30)).Value = passenger.LastName;
                    cmd.Parameters.Add(new SqlParameter("@age", SqlDbType.Int, 4)).Value = passenger.Age;
                    cmd.Parameters.Add(new SqlParameter("@aadharNo", SqlDbType.VarChar, 12)).Value = passenger.AadharNo;

                    SqlParameter result = new SqlParameter()
                    {
                        Direction = ParameterDirection.ReturnValue
                    };

                    cmd.Parameters.Add(result);
                    if (con.State == ConnectionState.Closed)
                    {
                        con.Open();
                    }
                    cmd.ExecuteNonQuery();
                    Console.WriteLine(result.Value);
                    return Convert.ToInt32(result.Value);
                }
            }
        }

        public List<PassengerDetails> GetAllPassengerDetails()
        {
            List<PassengerDetails> passengers = new List<PassengerDetails>();
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("Select * from PassengerDetails", con))
                {
                    if (con.State == ConnectionState.Closed)
                    {
                        con.Open();
                    }
                    using (reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                PassengerDetails passenger = new PassengerDetails()
                                {
                                    PassengerId = reader.GetInt32(0),
                                    PnrNo = reader.GetInt64(1),
                                    FirstName = reader.GetString(2),
                                    LastName = reader.GetString(3),
                                    Age = reader.GetInt32(4),
                                    AadharNo = reader.GetString(5),
                                };
                                passengers.Add(passenger);
                            }
                        }
                    }
                }
                return passengers;
            }
        }

        public int RemovePassenger(int passengerId)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_RemovePassenger", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@passengerId", SqlDbType.BigInt, 8)).Value = passengerId;

                    SqlParameter result = new SqlParameter()
                    {
                        Direction = ParameterDirection.ReturnValue
                    };
                    cmd.Parameters.Add(result);
                    if (con.State == ConnectionState.Closed)
                    {
                        con.Open();
                    }
                    cmd.ExecuteNonQuery();

                    return Convert.ToInt32(result.Value);

                }
            }
        }
    }
}
