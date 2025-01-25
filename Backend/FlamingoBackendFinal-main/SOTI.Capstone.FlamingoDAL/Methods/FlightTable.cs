using SOTI.Capstone.FlamingoDAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using SOTI.Capstone.FlamingoDAL.Models;
using System.Runtime.Remoting.Messaging;

namespace SOTI.Capstone.FlamingoDAL.Methods
{
    /// <summary>
    /// All the methods related to flight Table are in this class
    /// </summary>
    public class FlightTable : IFlightAdmin , IFlightUser
    {
        //get flights // use disconnected 
        //update flights // connected
        //delete flights //connected
        //add flights //connected
        //get flight by id // connected
        //search flight for users// connected

        private SqlConnection con = null;
        private SqlCommand cmd = null;
        private SqlDataAdapter adapter = null;

        //using connected environment
        public bool AddFlightDetails(FlightAdmin flight) //working fine
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_AddFlightDetails", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }
                    cmd.Parameters.Add(new SqlParameter("@Origin", SqlDbType.NVarChar, 40));
                    cmd.Parameters.Add(new SqlParameter("@Destination", SqlDbType.NVarChar, 40));
                    cmd.Parameters.Add(new SqlParameter("@TimeOfDeparture", SqlDbType.DateTime, 16));
                    cmd.Parameters.Add(new SqlParameter("@TimeOfArrival", SqlDbType.DateTime, 16));
                    cmd.Parameters.Add(new SqlParameter("@KmsTravel", SqlDbType.Int, 32));
                    cmd.Parameters.Add(new SqlParameter("@DaysOfFlight", SqlDbType.NVarChar, 64));
                    cmd.Parameters.Add(new SqlParameter("@StartingFarePerSeat", SqlDbType.Decimal, 32));
                    cmd.Parameters.Add(new SqlParameter("@TotalNumberOfSeats", SqlDbType.SmallInt, 4));
                    cmd.Parameters.Add(new SqlParameter("@SeatsBooked", SqlDbType.SmallInt, 4));
                    cmd.Parameters.Add(new SqlParameter("@BreakFlight", SqlDbType.Char, 1));


                    cmd.Parameters["@Origin"].Value = flight.Origin;
                    cmd.Parameters["@Destination"].Value = flight.Destination;
                    cmd.Parameters["@TimeOfDeparture"].Value = flight.TimeOfDeparture;
                    cmd.Parameters["@TimeOfArrival"].Value = flight.TimeOfArrival;
                    cmd.Parameters["@KmsTravel"].Value = flight.KmsTravel;
                    cmd.Parameters["@DaysOfFlight"].Value = flight.DaysOfFlight;
                    cmd.Parameters["@StartingFareperSeat"].Value = flight.StartingFarePerSeat;
                    cmd.Parameters["@TotalNumberOfSeats"].Value = flight.TotalNumberOfSeats;
                    cmd.Parameters["@SeatsBooked"].Value = flight.SeatsBooked;
                    cmd.Parameters["@BreakFlight"].Value = flight.BreakFlight;

                    var res = cmd.ExecuteNonQuery();
                    return res > 0;
                }
            }
        }

        //using connected environment
        public bool DeleteFlightDetails(int flightId) //working fine
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_DeleteFlightEntry", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }
                    cmd.Parameters.Add(new SqlParameter("@FlightId", SqlDbType.Int, 32));

                    cmd.Parameters["@FlightId"].Value = flightId;

                    var res = cmd.ExecuteNonQuery();
                    return res > 0;
                }
            }
        }

        //getting the flights using disconnected environment
        public List<FlightAdmin> GetAllFlights()
        {
            List<FlightAdmin> flights = new List<FlightAdmin>();
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_GetAllFlightDetails", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        using (DataSet ds = new DataSet())
                        {
                            adapter.Fill(ds, "Flights");
                            if (ds.Tables.Contains("Flights"))
                            {
                                foreach (DataRow row in ds.Tables["Flights"].Rows)
                                {
                                    {
                                        FlightAdmin flight = new FlightAdmin
                                        {
                                            FlightId = Convert.ToInt32(row["FlightId"]),
                                            FlightName = row["FlightName"].ToString(),
                                            Origin = row["Origin"].ToString(),
                                            Destination = row["Destination"].ToString(),
                                            TimeOfDeparture = Convert.ToDateTime(row["TimeOfDeparture"]),
                                            TimeOfArrival = Convert.ToDateTime(row["TimeOfArrival"]),
                                            KmsTravel = Convert.ToInt32(row["KmsTravel"]),
                                            DaysOfFlight = row["DaysOfFlight"].ToString(),
                                            StartingFarePerSeat = Convert.ToInt32(row["StartingFarePerSeat"]),
                                            TotalNumberOfSeats = Convert.ToInt32(row["TotalNumberOfSeats"]),
                                            SeatsBooked = Convert.ToInt32(row["SeatsBooked"]),
                                            BreakFlight = Convert.ToChar(row["BreakFlight"])
                                        };
                                        flights.Add(flight);
                                    }
                                }
                            }
                            return flights;
                        }
                    }
                }
            }
        }

        //using disconnected environment
        public FlightAdmin GetFlightById(int flightId)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_GetFlightById", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        adapter.SelectCommand.Parameters.AddWithValue("@flightId", flightId);
                        using (DataSet ds = new DataSet())
                        {
                            adapter.Fill(ds, "Flights");
                            if (ds.Tables.Contains("Flights"))
                            {
                                DataRow row = ds.Tables["Flights"].Rows[0];

                                FlightAdmin flight = new FlightAdmin
                                {
                                    FlightId = Convert.ToInt32(row["FlightId"]),
                                    FlightName = row["FlightName"].ToString(),
                                    Origin = row["Origin"].ToString(),
                                    Destination = row["Destination"].ToString(),
                                    TimeOfDeparture = Convert.ToDateTime(row["TimeOfDeparture"]),
                                    TimeOfArrival = Convert.ToDateTime(row["TimeOfArrival"]),
                                    KmsTravel = Convert.ToInt32(row["KmsTravel"]),
                                    DaysOfFlight = row["DaysOfFlight"].ToString(),
                                    StartingFarePerSeat = Convert.ToInt32(row["StartingFarePerSeat"]),
                                    TotalNumberOfSeats = Convert.ToInt32(row["TotalNumberOfSeats"]),
                                    SeatsBooked = Convert.ToInt32(row["SeatsBooked"]),
                                    BreakFlight = Convert.ToChar(row["BreakFlight"])
                                };
                                return flight;
                            }
                            return null;
                            
                        }
                    }
                }
            }
        }

       

        public bool UpdateFlightDetails(int flightId, FlightAdmin flight)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_UpdateFlightDetails", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    cmd.Parameters.Add(new SqlParameter("@FlightId", SqlDbType.Int, 32));
                    cmd.Parameters["@FlightId"].Value = flightId;



                    cmd.Parameters.Add(new SqlParameter("@Origin", SqlDbType.NVarChar, 40));
                    cmd.Parameters.Add(new SqlParameter("@Destination", SqlDbType.NVarChar, 40));
                    cmd.Parameters.Add(new SqlParameter("@TimeOfDeparture", SqlDbType.DateTime, 16));
                    cmd.Parameters.Add(new SqlParameter("@TimeOfArrival", SqlDbType.DateTime, 16));
                    cmd.Parameters.Add(new SqlParameter("@KmsTravel", SqlDbType.Int, 32));
                    cmd.Parameters.Add(new SqlParameter("@DaysOfFlight", SqlDbType.NVarChar, 64));
                    cmd.Parameters.Add(new SqlParameter("@StartingFarePerSeat", SqlDbType.Decimal, 32));
                    cmd.Parameters.Add(new SqlParameter("@TotalNumberOfSeats", SqlDbType.SmallInt, 4));
                    cmd.Parameters.Add(new SqlParameter("@SeatsBooked", SqlDbType.SmallInt, 4));
                    cmd.Parameters.Add(new SqlParameter("@BreakFlight", SqlDbType.Char, 1));


                    cmd.Parameters["@Origin"].Value = flight.Origin;
                    cmd.Parameters["@Destination"].Value = flight.Destination;
                    cmd.Parameters["@TimeOfDeparture"].Value = flight.TimeOfDeparture;
                    cmd.Parameters["@TimeOfArrival"].Value = flight.TimeOfArrival;
                    cmd.Parameters["@KmsTravel"].Value = flight.KmsTravel;
                    cmd.Parameters["@DaysOfFlight"].Value = flight.DaysOfFlight;
                    cmd.Parameters["@StartingFareperSeat"].Value = flight.StartingFarePerSeat;
                    cmd.Parameters["@TotalNumberOfSeats"].Value = flight.TotalNumberOfSeats;
                    cmd.Parameters["@SeatsBooked"].Value = flight.SeatsBooked;
                    cmd.Parameters["@BreakFlight"].Value = flight.BreakFlight;

                    var res = cmd.ExecuteNonQuery();
                    return res > 0;
                }
            }
        }


        // Method to search Flights for user

        public List<FlightAdmin> SearchFlights(FlightUser userSearch)
        {
            List<FlightAdmin> flights = new  List<FlightAdmin>();
            
            using(con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_SearchFlightsForUsers", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {

                        adapter.SelectCommand.CommandType = CommandType.StoredProcedure;


                        //Adding the parameters for stored Procedure
                        adapter.SelectCommand.Parameters.AddWithValue("@Origin", userSearch.Origin);
                        adapter.SelectCommand.Parameters.AddWithValue("@Destination", userSearch.Destination);
                        adapter.SelectCommand.Parameters.AddWithValue("@TimeOfDeparture", userSearch.TimeOfDeparture);
                        adapter.SelectCommand.Parameters.AddWithValue("@NumberOfPassengers", userSearch.NumberOfPassengers);

                        using (DataSet ds = new DataSet())
                        {
                            adapter.Fill(ds, "Flights");

                            if (ds.Tables.Contains("Flights"))
                            {
                                foreach (DataRow row in ds.Tables["Flights"].Rows)
                                {
                                    {
                                        FlightAdmin flight = new FlightAdmin
                                        {
                                            FlightId = Convert.ToInt32(row["FlightId"]),
                                            FlightName = row["FlightName"].ToString(),
                                            Origin = row["Origin"].ToString(),
                                            Destination = row["Destination"].ToString(),
                                            TimeOfDeparture = Convert.ToDateTime(row["TimeOfDeparture"]),
                                            TimeOfArrival = Convert.ToDateTime(row["TimeOfArrival"]),
                                            KmsTravel = Convert.ToInt32(row["KmsTravel"]),
                                            DaysOfFlight = row["DaysOfFlight"].ToString(),
                                            StartingFarePerSeat = Convert.ToInt32(row["StartingFarePerSeat"]),
                                            TotalNumberOfSeats = Convert.ToInt32(row["TotalNumberOfSeats"]),
                                            SeatsBooked = Convert.ToInt32(row["SeatsBooked"]),
                                            BreakFlight = Convert.ToChar(row["BreakFlight"])
                                        };
                                        flights.Add(flight);
                                    }
                                }
                            }
                            return flights;
                        }
                    }
                }
            }   
        }

    }
}

