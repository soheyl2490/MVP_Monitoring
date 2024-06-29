using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Domain.Entities;

namespace MVP_Monitoring.Application.DeviceItemParametersValue.Commands
{
    public class InsertDeviceItemParametersValueListCommand : ICommand
    {
        public List<MVP_Monitoring.Domain.Entities.DeviceItemParametersValue> deviceItemParametersValuesList { get; set; }
    }
}
