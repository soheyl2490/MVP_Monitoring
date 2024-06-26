using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MVP_Monitoring.Domain.Entities.Common.Enums;

namespace MVP_Monitoring.Domain.Models.ViewModels
{
    public class DeviceItemParametersValueViewModel
    {
        public int DeviceItemId { get; set; }

        public int Temperature { get; set; }

        public int RotationSpeed { get; set; }

        public int MotorFlow { get; set; }

        public int BearingTemperature { get; set; }
    }
}
