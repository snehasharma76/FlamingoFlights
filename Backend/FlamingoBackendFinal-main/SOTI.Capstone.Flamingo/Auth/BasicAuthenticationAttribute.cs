using SOTI.Capstone.FlamingoDAL.Methods;
using SOTI.Capstone.FlamingoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace SOTI.Capstone.Flamingo.Auth
{
    public class BasicAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        private RegisterTable _registeredUser = null;

        public BasicAuthenticationAttribute()
        {
            _registeredUser = new RegisterTable();
        }


        public bool AllowMultiple => throw new NotImplementedException();



        public async Task<Register> IsValidUser(string emailId, string password)
        {
            return await _registeredUser.ValidateUserAsync(emailId, password);
        }

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            string authorization = context.Request.Headers.Authorization?.ToString();
            if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Basic")) // checking if user entered credentials or not.
            {
                string credentials = Encoding.UTF8.GetString(Convert.FromBase64String(authorization.Substring(6)));//username:password
                string[] data = credentials.Split(':');
                string username = data[0];
                string password = data[1];
                Register userDetails = await IsValidUser(username, password);

                if (userDetails != null)
                {
                    var identity = new GenericIdentity(username);
                    identity.AddClaim(new Claim(ClaimTypes.Email, username));
                    identity.AddClaim(new Claim(ClaimTypes.Name, userDetails.FirstName + " " + userDetails.LastName));
                    identity.AddClaim(new Claim("role", userDetails.Role));

                    IPrincipal principal = new GenericPrincipal(identity, userDetails.Role.Split(','));
                    context.Principal = principal;

                    if (HttpContext.Current != null)
                    {
                        HttpContext.Current.User = principal;
                    }
                    else
                    {
                        context.ErrorResult = new UnauthorizedResult(new System.Net.Http.Headers.AuthenticationHeaderValue[0], context.Request);
                    }
                }
                else
                {
                    context.ErrorResult = new UnauthorizedResult(new System.Net.Http.Headers.AuthenticationHeaderValue[0], context.Request);
                }
            }
            else
            {
                context.ErrorResult = new UnauthorizedResult(new System.Net.Http.Headers.AuthenticationHeaderValue[0], context.Request);
            }
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}