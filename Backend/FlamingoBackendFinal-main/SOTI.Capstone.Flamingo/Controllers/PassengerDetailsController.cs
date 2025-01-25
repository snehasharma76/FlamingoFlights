using SOTI.Capstone.FlamingoDAL.Interfaces;
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
    [RoutePrefix("api/passenger-details")]
    public class PassengerDetailsController : ApiController
    {
        private readonly IPassengerDetails passenger = null;

        public PassengerDetailsController(IPassengerDetails _passenger)
        {
            passenger = _passenger;
        }

        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetPassengersDetails()
        {
            var dt = passenger.GetAllPassengerDetails();
            if (dt == null)
            {
                return NotFound();
            }
            return Ok(dt);
        }

        [HttpPost]
        [Route("add-passenger")]
        public IHttpActionResult AddPassenger([FromBody] PassengerDetails details)
        {
            int dt = passenger.AddPassengerDetails(details);

            if (dt == 1)
            {
                return Created("api/booking/bookedflights", details);
            }
            else
            {
                return BadRequest("PNR Doesn't exists");
            }

        }

        [HttpDelete]
        [Route("remove/{passengerId}")]
        public IHttpActionResult RemovePassenger([FromUri] int passengerId)
        {
            int dt = passenger.RemovePassenger(passengerId);
            if (dt == 1)
            {
                return Ok("Successfully Deleted");
            }
            return BadRequest("Passenger doesn't exists");
        }
    }
}
