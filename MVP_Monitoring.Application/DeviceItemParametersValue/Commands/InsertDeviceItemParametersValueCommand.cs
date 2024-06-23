using MVP_Monitoring.Application.Common.Mediator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItemParametersValue.Commands
{
    public class InsertDeviceItemParametersValueCommand : ICommand
    {
        public int DeviceItemId { get; set; }

        public int Temperature { get; set; }

        public int Rotationalspeed { get; set; }

        public int MotorFlow { get; set; }

        public int BearingTemperature { get; set; }

    }
}
