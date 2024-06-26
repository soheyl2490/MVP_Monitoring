using MVP_Monitoring.Application.Common;
using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.Device.Queries
{
    public class GetDeviceListQuery : IQuery<PagingViewModel<DeviceViewModel>>
    {
        //public int Page { get; set; }
        //public string Filter { get; set; }
    }
}
