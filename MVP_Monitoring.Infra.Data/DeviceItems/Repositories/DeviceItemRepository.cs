using MVP_Monitoring.Domain.Entities;
using MVP_Monitoring.Domain.Repositories;
using MVP_Monitoring.Infra.Data.Common.Context;
using MVP_Monitoring.Infra.Data.Common.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Infra.Data.DeviceItems.Repositories
{
    public class DeviceItemRepository : Repository<DeviceItem>, IDeviceItemRepository
    {
        public DeviceItemRepository(DataBaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
