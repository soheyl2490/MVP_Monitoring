using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItem.Queries
{
    public class GetDeviceItemListQuery : IQuery<List<DeviceItemListViewModel>>
    {
    }
}
