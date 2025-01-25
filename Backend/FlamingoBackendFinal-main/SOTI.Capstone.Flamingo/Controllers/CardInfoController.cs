using SOTI.Capstone.Flamingo.Auth;
using SOTI.Capstone.FlamingoDAL.Interfaces;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;

namespace SOTI.Capstone.Flamingo.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Cards")]
    [BasicAuthentication]
    public class CardInfoController : ApiController
    {
        private readonly ICardInfo _cardInfo = null;
        public CardInfoController(ICardInfo cardInfo) //Dependency Injection
        {
            _cardInfo = cardInfo;
        }

        //Validate wheather the entered record matches the existing record or not
        //for this we will do the get request to check if it exists
        [HttpPost]
        [Route("cardcheck")]
        [BasicAuthorization(Roles = "User")]
        public IHttpActionResult ValidateCard([FromBody] CardInfo card)
        {
            try
            {

                var result = _cardInfo.ValidateCardDetails(card);
                if (result == false)
                {
                    return BadRequest();

                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

    }
}
