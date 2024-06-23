using MVP_Monitoring.Domain.Repositories;
using MVP_Monitoring.Domain.UnitOfWork;
using MVP_Monitoring.Infra.Data.Common.Context;
using MVP_Monitoring.Infra.Data.DeviceItemeParametersValue.Repositories;
using MVP_Monitoring.Infra.Data.DeviceItems.Repositories;
using MVP_Monitoring.Infra.Data.Devices.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Infra.Data.Common.UnitOfWork
{
    public class UnitOfWork(DataBaseContext DatabaseContext) : IUnitOfWork
    {
        #region Repo

        private IDeviceRepository _devices;
        public IDeviceRepository Devices
        {
            get
            {
                if (_devices == null)
                {
                    _devices = new DeviceRepository(DatabaseContext);
                }

                return _devices;
            }
        }

        private IDeviceItemRepository _deviceItems;
        public IDeviceItemRepository DeviceItems
        {
            get
            {
                if (_deviceItems == null)
                {
                    _deviceItems = new DeviceItemRepository(DatabaseContext);
                }

                return _deviceItems;
            }
        }

        private IDeviceItemParametersValueRepository _deviceItemParametersValue;
        public IDeviceItemParametersValueRepository DeviceItemParametersValue
        {
            get
            {
                if (_deviceItemParametersValue == null)
                {
                    _deviceItemParametersValue = new DeviceItemeParametersValueRepository(DatabaseContext);
                }

                return _deviceItemParametersValue;
            }
        }
        #endregion

        #region EFContext

        public async Task SaveAsync()
        {
            try
            {
                await DatabaseContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw;
            }
        }
        #endregion

        #region Dispose

        public bool IsDisposed { get; protected set; }

        public IDeviceItemRepository DeviceItem => throw new NotImplementedException();

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (IsDisposed)
            {
                return;
            }

            if (disposing)
            {
                if (DatabaseContext != null)
                {
                    DatabaseContext.Dispose();
                    DatabaseContext = null;
                }
            }

            IsDisposed = true;
        }

        ~UnitOfWork()
        {
            Dispose(false);
        }

        #endregion
    }
}
