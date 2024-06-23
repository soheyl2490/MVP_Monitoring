using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MVP_Monitoring.Domain.Entities.Common.Enums;

namespace MVP_Monitoring.Domain.Models.ViewModels
{
    public class DeviceItemViewModel
    {
        public string Title { get; set; }

        public string? Descriptions { get; set; } = string.Empty;

        public long DeviceId { get; set; }

        public DeviceType DeviceType { get; set; }
    }
}
