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
    [RoutePrefix("Coupons")]

    //All Api's working fine :) 
    public class CouponController : ApiController
    {
        private readonly ICoupon _coupon = null;
        public CouponController(ICoupon coupon) //Dependency Injection
        {
            _coupon = coupon;
        }

        //Get All Couopns
        [HttpGet]
        [Route("getAllCoupons")]
        public IHttpActionResult GetCouopns()
        {
            try
            {
                var ds = _coupon.GetAllCoupons();
                if (ds == null)
                {
                    return BadRequest();
                }
                else return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Add a Coupon
        [HttpPost]
        [Route("addcoupon")]
        public IHttpActionResult AddCoupons([FromBody] Coupon coupon)
        {
            try
            {
                var ds = _coupon.AddCouponEntry(coupon);
                if (ds == null)
                {
                    return BadRequest();
                }
                else return Created(""+ coupon.CouponCode,coupon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //update the coupon discount 
        [HttpPut]
        [Route("Update/{couponCode}")]

        public IHttpActionResult UpdateCouponDiscount([FromUri] string couponCode, [FromBody] Coupon coupon)
        {
            try
            {
                var result = _coupon.UpdateCouponEntry(coupon);
                if (couponCode != coupon.CouponCode)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Delete the Coupon
        [HttpDelete]
        [Route("Delete/{couponCode}")]
        public IHttpActionResult DeleteCoupon([FromUri] string couponCode)
        {
            try
            {
                var result = _coupon.DeleteCouponEntry(couponCode);

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
    }
}
