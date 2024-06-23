using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Entities.Common
{
    public class BaseEntity
    {
        [Key]
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
