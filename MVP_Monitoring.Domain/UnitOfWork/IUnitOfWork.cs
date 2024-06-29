using MVP_Monitoring.Domain.Entities;
using MVP_Monitoring.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.UnitOfWork
{
        public interface IUnitOfWork : IDisposable
        {
            public IDeviceRepository Devices { get; }

            public IDeviceItemRepository DeviceItems { get; }

            public IDeviceItemParametersValueRepository DeviceItemParametersValue { get; }


            #region dispose
            bool IsDisposed { get; }

            Task SaveAsync();

            #endregion
    }
}
