using Microsoft.EntityFrameworkCore;
using MVP_Monitoring.Domain.Entities;
using MVP_Monitoring.Infra.Data.DeviceItemeParametersValue.Configurations;
using MVP_Monitoring.Infra.Data.DeviceItems.Configurations;
using MVP_Monitoring.Infra.Data.Devices.Configurations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MVP_Monitoring.Infra.Data.Common.Context
{
    public class DataBaseContext(DbContextOptions<DataBaseContext> options) : DbContext(options)
    {
        public DbSet<Device> Devices { get; set; }

        public DbSet<DeviceItem> DeviceItems { get; set; }

        public DbSet<DeviceItemParametersValue> DeviceItemParametersValues { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DeviceConfigurations());

            modelBuilder.ApplyConfiguration(new DeviceItemConfigurations());

            modelBuilder.ApplyConfiguration(new DeviceItemeParametersValueConfigurations());

            base.OnModelCreating(modelBuilder);
        }
    }
}
