using SOTI.Capstone.Flamingo.Auth;
using SOTI.Capstone.FlamingoDAL.Interfaces;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;

namespace SOTI.Capstone.Flamingo.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Register")]


    public class RegisterController : ApiController
    {
        private readonly IRegister _registerTable = null;

        public RegisterController(IRegister register)
        {
            _registerTable = register;
        }


        [HttpPost]
        [Route("Add")]
        public IHttpActionResult AddRegister([FromBody] Register register)  // User and admin both can access it
        {

            try
            {
                bool result = _registerTable.AddRegistration(register); // calling this method to add the incoming register 

                if (result == false)
                {
                    return BadRequest("Email already exists!");
                }

                return Created("api/register/getall", register);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [HttpGet]
        [Route("GetAll")]
        [BasicAuthentication]
        [BasicAuthorizationAttribute(Roles = "Admin")]
        public IHttpActionResult GetAllData()  // it can be accessd by admin only
        {
            try
            {
                Register[] result = _registerTable.GetAllRegisterData(); // getting all the registered data

                if (result == null)
                {
                    return InternalServerError(); // return server error if getting null result
                }

                return Ok(result);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("login")]
        [BasicAuthentication]
        public IHttpActionResult login()  // can be access by both user and admin  //// if basic auth worked then this method will be called othrwise basic auth will throw an error response
        {

            try
            {
                ClaimsIdentity identity = User.Identity as ClaimsIdentity;  // getting user identity
                string role = "";

                if (identity != null)
                {
                    Claim roleClaim = identity.FindFirst("role"); // now gettting the claim from the identity

                    if (roleClaim != null)
                    {
                        role = roleClaim.Value; // storing roleclaim value
                    }
                }
                return Ok(role);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

    }
}
