using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SOTI.Capstone.Flamingo.Controllers
{
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [RoutePrefix("api/booking")]
        public class BookingFlightsController : ApiController
        {
            private readonly IBookingFlights bookFlight = null;

            public BookingFlightsController(IBookingFlights bookflight)
            {
                bookFlight = bookflight;
            }

            [HttpGet]
            [Route("bookedflights")]
            public IHttpActionResult GetBookedFlights([FromUri] string emailId)
            {
                var dt = bookFlight.GetAllFlights(emailId);
                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
            }

            [HttpPost]
            [Route("addbooking")]
            public IHttpActionResult BookFlight([FromBody] BookingFlights flight)
            {
                int dt = bookFlight.AddFlightBooking(flight);

                if (dt == 1)
                {
                    return Created("api/booking/bookedflights", flight);
                }
                else if (dt == -1)
                {
                    return BadRequest("Invalid Customer Id");
                }
                else if (dt == -2)
                {
                    return BadRequest("Invalid FLight Id");
                }
                else
                {
                    return BadRequest("Details Already Exists with the customerId and flightId");
                }

            }

            [HttpDelete]
            [Route("remove/{pnrNo}")]
            public IHttpActionResult DeleteBooking([FromUri] long pnrNo)
            {
                int dt = bookFlight.DeleteFlightBooking(pnrNo);
                if (dt == 1)
                {
                    return Ok("Successfully Deleted");
                }
                return BadRequest("PNR doesn't exists");
            }
        }
    }
