using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Entities.Common
{
    public static class Helpers
    {
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
    }
}
