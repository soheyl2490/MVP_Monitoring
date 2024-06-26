using MVP_Monitoring.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Models.ViewModels
{
    public class DeviceDataListViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }

        public string Descriptions { get; set; }

        public long? ParentId { get; set; }

        public string Logo { get; set; }

        public DateTime CreateDate { get; set; }

        public string PersianCreateDate { get; set; }
        
        public List<DeviceItem> DeviceItems { get; set; }
    }
}
