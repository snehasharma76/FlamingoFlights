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
    public class BookingFlightsTable:IBookingFlights
    {
        private SqlConnection con = null;
        private SqlCommand cmd = null;
        private SqlDataReader reader = null;


        public int AddFlightBooking(BookingFlights bookflight)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_BookingFlights", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@bookingDate", SqlDbType.DateTime, 22)).Value = bookflight.BookingDate;
                    cmd.Parameters.Add(new SqlParameter("@flightId", SqlDbType.Int, 8)).Value = bookflight.FlightId;
                    cmd.Parameters.Add(new SqlParameter("@flightDate", SqlDbType.DateTime, 22)).Value = bookflight.FlightDate;
                    cmd.Parameters.Add(new SqlParameter("@numberOfPassengers", SqlDbType.Int, 8)).Value = bookflight.NumberOfPassengers;
                    cmd.Parameters.Add(new SqlParameter("@ratePerSeat", SqlDbType.Decimal, 10)).Value = bookflight.RatePerSeat;
                    cmd.Parameters.Add(new SqlParameter("@paymentMode", SqlDbType.VarChar, 50)).Value = bookflight.PaymentMode;
                    cmd.Parameters.Add(new SqlParameter("@customerId", SqlDbType.Int, 8)).Value = bookflight.CustomerId;

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
        public List<BookingFlights> GetAllFlights(string emailId)
        {
            List<BookingFlights> res = new List<BookingFlights>();
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("Select * from FlightBooking fb join Register r on fb.CustomerId = r.CustomerId where r.Email = @EmailId", con))
                {
                    cmd.Parameters.Add(new SqlParameter("@EmailId", SqlDbType.VarChar, 255)).Value = emailId;
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

                                BookingFlights flights = new BookingFlights
                                {
                                    PnrNo = reader.GetInt64(0),
                                    BookingDate = reader.GetDateTime(1),
                                    FlightId = reader.GetInt32(2),
                                    FlightDate = reader.GetDateTime(3),
                                    NumberOfPassengers = reader.GetInt32(4),
                                    RatePerSeat = reader.GetDecimal(5),
                                    PaymentMode = reader.GetString(6),
                                    CustomerId = reader.GetInt32(7),
                                };
                                res.Add(flights);
                            }
                        }
                    }
                    return res;
                }
            }
        }

        public int DeleteFlightBooking(long pnrNo)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_DeleteFlightBooking", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@pnrNo", SqlDbType.BigInt, 64)).Value = pnrNo;

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
