using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SOTI.Capstone.FlamingoDAL.Interfaces;

namespace SOTI.Capstone.FlamingoDAL.Methods
{
    public class CouponTable : ICoupon
    {
        private SqlConnection con = null;
        private SqlCommand cmd = null;
        private SqlDataReader reader = null;
        private SqlDataAdapter adapter = null;

        //Add the new Coupon in the CouponCodes table //working fine
        public bool AddCouponEntry(Coupon coupon)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_AddCoupon", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }
                    cmd.Parameters.Add(new SqlParameter("@couponcode", SqlDbType.NVarChar, 40));
                    cmd.Parameters.Add(new SqlParameter("@discount", SqlDbType.Int, 32));
                    cmd.Parameters["@couponcode"].Value = coupon.CouponCode;
                    cmd.Parameters["@discount"].Value = coupon.Discount;
                    var res = cmd.ExecuteNonQuery();
                    return res > 0;
                }
            }
        }

        //Delete The coupon from the table //working fine
        public bool DeleteCouponEntry(string couponCode)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_DeleteCoupon", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }
                    cmd.Parameters.Add(new SqlParameter("@couponcode", SqlDbType.NVarChar, 32));
                    cmd.Parameters["@couponcode"].Value = couponCode;
                    var res = cmd.ExecuteNonQuery();
                    return res > 0;
                }
            }
        }


        //Get all the Couopns from the table // working fine
        public List<Coupon> GetAllCoupons() 
        {
            List<Coupon> coupons = new List<Coupon>();
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (adapter = new SqlDataAdapter("usp_GetAllCoupons", con))
                {
                    using (DataSet ds = new DataSet())
                    {
                        adapter.Fill(ds, "CouponCodes");
                        if (ds.Tables.Contains("CouponCodes"))
                        {
                            foreach (DataRow row in ds.Tables["CouponCodes"].Rows)
                            {
                                Coupon coupon = new Coupon
                                {
                                    CouponCode = row["CouponCode"].ToString(),
                                    Discount = Convert.ToInt32(row["Discount"])
                                };
                                coupons.Add(coupon);
                            }
                        }
                        return coupons;
                    }
                }
            }
        }

        //update the discount value of the coupon // working fine
        public bool UpdateCouponEntry(Coupon coupon)
        {
            using (con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (cmd = new SqlCommand("usp_UpdateCoupon", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }
                    cmd.Parameters.Add(new SqlParameter("@CouponCode", SqlDbType.NVarChar, 40));
                    cmd.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Int, 32));
                    cmd.Parameters["@CouponCode"].Value = coupon.CouponCode;
                    cmd.Parameters["@Discount"].Value = coupon.Discount;
                    var res = cmd.ExecuteNonQuery();
                    return res > 0;
                }
            }
        }
    }
}
