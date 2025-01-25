using SOTI.Capstone.FlamingoDAL.Interfaces;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOTI.Capstone.Flamingo.Controllers
{
    [RoutePrefix("api/passenger-details")]
    public class BookingCancellationController : ApiController
    {
        private readonly IBookingCancellation _flight = null;
        public BookingCancellationController(IBookingCancellation flight) //Dependency Injection
        {
            _flight = flight;
        }



        [HttpPost]
        [Route("cancellation/addentry")]
        public IHttpActionResult AddCancel([FromBody] BookingCancellation flight)
        {
            try
            {
                var ds = _flight.AddCancelEntry(flight);
                if (ds == null) return BadRequest();
                return Created("api/addentry", flight);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
