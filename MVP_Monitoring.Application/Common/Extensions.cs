using Azure.Core;
using MVP_Monitoring.Domain.Entities.Common;
using System.Security;
using System.Security.Claims;

namespace MVP_Monitoring.Application.Common
{
    public static class Extensions
    {
        //public static bool IsInRole(this ClaimsPrincipal userPrincipal, RolePermission permission)
        //{
        //    return userPrincipal.IsInRole(((long)permission).ToString());
        //}
        //public static bool IsInRole(this ClaimsPrincipal userPrincipal, params RolePermission[] permissions)
        //{
        //    return permissions.All(permission =>
        //        userPrincipal.IsInRole(((long)permission).ToString())
        //    );
        //}
        public static string GetPersianDateFromEnglish(this DateTime gregorianDate)
        {
            try
            {
                if (gregorianDate.Kind == DateTimeKind.Utc)
                {
                    gregorianDate = gregorianDate.ToLocalTime();
                }

                var persiandate = new System.Globalization.PersianCalendar();
                return $"{persiandate.GetYear(gregorianDate)}/{(persiandate.GetMonth(gregorianDate).ToString().Length < 2 ? "0" + persiandate.GetMonth(gregorianDate).ToString() : persiandate.GetMonth(gregorianDate).ToString())}/{(persiandate.GetDayOfMonth(gregorianDate).ToString().Length < 2 ? "0" + persiandate.GetDayOfMonth(gregorianDate).ToString() : persiandate.GetDayOfMonth(gregorianDate).ToString())}";
            }
            catch
            {
                return "";
            }
        }

        public class PagingViewModel<T> where T : class
        {
            public int PageCount { get; set; }

            public IList<T> Results { get; set; }

            public PagingViewModel()
            {
                Results = new List<T>();
            }
        }

        public static int CalculateSkip(this int page,int take)
        {
            if (page == 0)
                page = 1;

            return (page * take) - take;
        }
        
        public static int CalculatePageCount(this int count,int take)
        {
            var pageCount = count / take;
            if (count % take != 0)
                pageCount++;

            return pageCount;
        }
    }
    public class PagingViewModel<T>
    {
        public int PageCount { get; set; }
        public IList<T> Results { get; set; }

        public PagingViewModel()
        {
            Results = new List<T>();
        }
    }
}