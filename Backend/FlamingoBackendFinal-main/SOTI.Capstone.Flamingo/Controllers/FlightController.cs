using SOTI.Capstone.FlamingoDAL.Interfaces;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;


namespace SOTI.Capstone.Flamingo.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("Flights")]
    public class FlightController : ApiController
    {
        private readonly IFlightAdmin _flightAdmin = null;
        private readonly IFlightUser _flightUser = null;
        public FlightController(IFlightAdmin flightAdmin, IFlightUser flightUser) //Dependency Injection
        {
            _flightAdmin = flightAdmin;
            _flightUser = flightUser;
        }
        /// <summary>
        /// All first 5 are admin api's and the last 1 is user's search flight api
        /// </summary>
        /// <returns></returns>
        //Get All Flights from the table (Select * From Flights)

        [HttpGet]
        [Route("Admin/GetFlights")]
        public IHttpActionResult GetFlights()
        {
            try
            {
                var result = _flightAdmin.GetAllFlights();
                if (result != null)
                {
                     return Ok(result);
                }
                 return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Get Flight By Id // Select * from Flights Where FlightId = flightId
        [HttpGet]
        [Route("Admin/GetFlights/{flightId}")]
        public IHttpActionResult GetFlightById([FromUri] int flightId)
        {
            try
            {
                var result = _flightAdmin.GetFlightById(flightId);
                if (result != null)
                {
                    return Ok(result);
                }
                 return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Add the New Flight in the table
        [HttpPost]
        [Route("Admin/AddFlight")]
        //[Authorize(Roles = "Admin, Employee")]
        public IHttpActionResult AddFlight(FlightAdmin flight)
        {
            try
            {
                var result = _flightAdmin.AddFlightDetails(flight);
                if (result)
                {
                    //return StatusCode(HttpStatusCode.NoContent);
                    return Created("" + flight.FlightId, flight); //we want to return the id to the user so that he knows what id is created when product got added
                }
                return BadRequest();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Update the Existing record in the table
        [HttpPut]
        [Route("Admin/UpdateFlight/{flightId}")]
        public IHttpActionResult UpdateFlight([FromUri] int flightId, [FromBody] FlightAdmin flight)
        {
            try
            {
                if (flightId != flight.FlightId)
                {
                    return BadRequest("Id is not valid");
                }

                var result = _flightAdmin.UpdateFlightDetails(flightId, flight);
                
                if (result)
                {
                    return Ok("Updated Successfully!!");
                }
                return BadRequest();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Delete The Flight From the table
        [HttpDelete]
        [Route("Admin/Delete/{flightId}")]
        public IHttpActionResult DeleteFlight([FromUri] int flightId)
        {
            try
            {
                var result = _flightAdmin.DeleteFlightDetails(flightId);
                if (result)
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("User/searchflights")]
        public IHttpActionResult GetFlightsByDetails([FromBody] FlightUser flightUser)
        {
            try
            {
                var result = _flightUser.SearchFlights(flightUser);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
