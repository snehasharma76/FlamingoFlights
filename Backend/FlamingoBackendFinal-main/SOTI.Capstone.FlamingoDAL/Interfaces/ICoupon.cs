using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTI.Capstone.FlamingoDAL.Interfaces
{
    public interface ICoupon
    {
        bool AddCouponEntry(Coupon coupon);
        bool DeleteCouponEntry(string couponCode);
        bool UpdateCouponEntry(Coupon coupon);
        List<Coupon> GetAllCoupons();
    }
}
