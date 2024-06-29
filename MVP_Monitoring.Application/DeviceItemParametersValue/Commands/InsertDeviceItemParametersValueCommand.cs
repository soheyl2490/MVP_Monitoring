using MVP_Monitoring.Application.Common.Mediator;

namespace MVP_Monitoring.Application.DeviceItemParametersValue.Commands
{
    public class InsertDeviceItemParametersValueCommand : ICommand
    {
        public int DeviceItemId { get; set; }

        public int Temperature { get; set; }

        public int RotationSpeed { get; set; }

        public int MotorFlow { get; set; }

        public int BearingTemperature { get; set; }

    }
}
