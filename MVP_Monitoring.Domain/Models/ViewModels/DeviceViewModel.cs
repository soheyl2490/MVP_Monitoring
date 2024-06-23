using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Models.ViewModels
{
    public class DeviceViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }

        public string Descriptions { get; set; }

        public long? ParentId { get; set; }
    }
}
