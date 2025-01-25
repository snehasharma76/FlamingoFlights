using SOTI.Capstone.FlamingoDAL.Interfaces;
using SOTI.Capstone.FlamingoDAL.Methods;
using SOTI.Capstone.FlamingoDAL.Models;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace SOTI.Capstone.Flamingo
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IFlightAdmin, FlightTable>();
            container.RegisterType<ICardInfo, CardInfoTable>();
            container.RegisterType<IFlightUser, FlightTable>();
            container.RegisterType<ICoupon, CouponTable>();
            container.RegisterType<IRegister, RegisterTable>();
            container.RegisterType<IBookingCancellation, BookingCancellationTable>();
            container.RegisterType<IBookingFlights, BookingFlightsTable>();
            container.RegisterType<IPassengerDetails, PassengerDetailsTable>();

            


            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}