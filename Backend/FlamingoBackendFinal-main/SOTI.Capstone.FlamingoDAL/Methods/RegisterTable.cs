using SOTI.Capstone.FlamingoDAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SOTI.Capstone.FlamingoDAL.Models;

namespace SOTI.Capstone.FlamingoDAL.Methods
{
    public class RegisterTable : IRegister
    {
        private SqlConnection _con;
        private SqlCommand _cmd;

        // This method will help in inserting a new row in the register table and uses a procedure to do it
        public bool AddRegistration(Register register)
        {

            using (_con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                using (_cmd = new SqlCommand("usp_InsertIntoRegister", _con)) // using procedure
                {
                    if (_con.State != ConnectionState.Open) // if _con is not open then open it
                    {
                        _con.Open();
                    }

                    // now adding sql params and their values
                    _cmd.CommandType = CommandType.StoredProcedure;

                    _cmd.Parameters.Add(new SqlParameter("@FirstName", SqlDbType.VarChar, 200));
                    _cmd.Parameters.Add(new SqlParameter("@LastName", SqlDbType.VarChar, 200));
                    _cmd.Parameters.Add(new SqlParameter("@Email", SqlDbType.VarChar, 200));
                    _cmd.Parameters.Add(new SqlParameter("@DateOfBirth", SqlDbType.Date));
                    _cmd.Parameters.Add(new SqlParameter("@AadharId", SqlDbType.VarChar, 200));
                    _cmd.Parameters.Add(new SqlParameter("@Password", SqlDbType.VarChar, 200));


                    _cmd.Parameters["@FirstName"].Value = register.FirstName;
                    _cmd.Parameters["@LastName"].Value = register.LastName;
                    _cmd.Parameters["@Email"].Value = register.Email;
                    _cmd.Parameters["@DateOfBirth"].Value = register.DateOfBirth;
                    _cmd.Parameters["@AadharId"].Value = register.AadharId;
                    _cmd.Parameters["@Password"].Value = register.Password;


                    int numOfRowsAffected = _cmd.ExecuteNonQuery();

                    return numOfRowsAffected > 0; // if one or more rows affected then return true 
                }
            }
        }




        public Register[] GetAllRegisterData()
        {
            List<Register> registerList;

            using (_con = new SqlConnection(ConnectionString.GetConnectionString()))
            {
                if (_con.State != ConnectionState.Open) // if _con is not open then open it
                {
                    _con.Open();
                }

                using (SqlDataAdapter adapter = new SqlDataAdapter("usp_GetAllRegisters", _con))
                {
                    using (DataTable registerDataTable = new DataTable())
                    {
                        adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        adapter.Fill(registerDataTable);
                        registerList = new List<Register>();

                        foreach (DataRow row in registerDataTable.Rows)
                        {
                            Register register = new Register
                            {
                                CustomerId = Convert.ToInt32(row["CustomerId"]),
                                FirstName = row["FirstName"].ToString(),
                                LastName = row["LastName"].ToString(),
                                Email = row["Email"].ToString(),
                                DateOfBirth = Convert.ToDateTime(row["DateOfBirth"]),
                                AadharId = row["AadharId"].ToString(),
                                Password = row["Password"].ToString(),
                                Role = row["Role"].ToString()
                            };

                            registerList.Add(register);
                        }
                    }

                }
            }

            return registerList.ToArray(); // Converting List<Register> to Register[]
        }

        public Task<Register> ValidateUserAsync(string emailId, string password)
        {
            return Task.Run(() =>
            {
                using (_con = new SqlConnection(ConnectionString.GetConnectionString()))
                {
                    using (SqlDataAdapter adapter = new SqlDataAdapter("usp_ValidateUser", _con))
                    {
                        if (_con.State == ConnectionState.Closed)
                        {
                            _con.Open();
                        }

                        using (DataTable registerDataTable = new DataTable())
                        {
                            adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                            adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                            adapter.SelectCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 50)).Value = emailId;
                            adapter.SelectCommand.Parameters.Add(new SqlParameter("@password", SqlDbType.VarChar, 50)).Value = password;


                            adapter.Fill(registerDataTable);
                            Register register = null;



                            foreach (DataRow row in registerDataTable.Rows)
                            {
                                register = new Register
                                {
                                    CustomerId = Convert.ToInt32(row["CustomerId"]),
                                    FirstName = row["FirstName"].ToString(),
                                    LastName = row["LastName"].ToString(),
                                    Email = row["Email"].ToString(),
                                    DateOfBirth = Convert.ToDateTime(row["DateOfBirth"]),
                                    AadharId = row["AadharId"].ToString(),
                                    Password = row["Password"].ToString(),
                                    Role = row["Role"].ToString()
                                };

                                break;
                            }

                            return register;
                        }
                    }
                }
            });
        }
    }
}
