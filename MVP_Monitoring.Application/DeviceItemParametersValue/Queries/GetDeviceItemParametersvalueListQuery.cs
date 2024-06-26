using MVP_Monitoring.Application.Common;
using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItemParametersValue.Queries
{
    public class GetDeviceItemParametersValueListQuery : IQuery<PagingViewModel<DeviceItemParametersValueViewModel>>
    {
        //public int Page { get; set; }
        //public string Filter { get; set; }
    }
}
