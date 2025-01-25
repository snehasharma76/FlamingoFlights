using SOTI.Capstone.FlamingoDAL.Methods;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.ConsoleTest
{
    public class Program
    {
        static void Main(string[] args)
        {
            //Program p = new Program();
            FlightTable t = new FlightTable();
            //Console.WriteLine(t.AddFlightDetails("Delhi", "Kolkata", DateTime.Now, DateTime.Now, 100, "Mondays, Fridays", 3000, 200, 0, 'Y')); 
            //Console.WriteLine(t.DeleteFlightDetails(1001));
            //var x = t.GetAllFlights();
            //Console.WriteLine(x.Count);
            //foreach (Flight item in x)
            //{
            //    Console.WriteLine(item.Origin);
            //}
            //var x = t.GetFlightById(1002);
            //Console.WriteLine(x.Origin);

            //var x = t.UpdateFlightDetails(1002, "Delhi", "Leh", DateTime.Now, DateTime.Now, 100, "Mondays, Fridays", 3000, 200, 0, 'Y');
            //Console.WriteLine(x.Destination);

            //CardInfo card = new CardInfo
            //{
            //    CardType = "Debit",
            //    CardNumber = "1234567891024507",
            //    Cvv = 123,
            //    ExpiryDate = "09/2023"
            //};
            //CardInfoTable info = new CardInfoTable();
            //Console.WriteLine(info.ValidateCardDetails(card));
            //DateTime departure = new DateTime(2023, 9, 16, 14, 30, 0);
            //DateTime arrival = new DateTime(2023, 9, 16, 18, 42, 0);

            //FlightAdmin flight = new FlightAdmin
            //{
            //    Origin = "Delhi",
            //    Destination = "Mumbai",
            //    TimeOfDeparture = departure,
            //    TimeOfArrival = arrival,
            //    KmsTravel = 100,
            //    DaysOfFlight = "Mondays, Fridays",
            //    StartingFarePerSeat = 3000,
            //    TotalNumberOfSeats = 200,
            //    SeatsBooked= 0,
            //    BreakFlight= 'N'
            //};

            // Console.WriteLine(t.AddFlightDetails(flight));
            CouponTable ct = new CouponTable();
            //Console.WriteLine(ct.AddCouponEntry( new Coupon{CouponCode = "APP5", Discount = 5})); 
            //var x = ct.GetAllCoupon();
            //foreach(Coupon item in x)
            //{
            //    Console.WriteLine(item.CouponCode + "--->" + item.Discount);
            //}

            //BookingCancellationTable bk = new BookingCancellationTable();
            //BookingCancellation obj = new BookingCancellation
            //{
            //    PNRNo = 3,
            //    FlightId = 1050,
            //    RefundStatus = 'Y'
            //};
            //Console.WriteLine(bk.AddCancelEntry(obj));
        }
    }
}
