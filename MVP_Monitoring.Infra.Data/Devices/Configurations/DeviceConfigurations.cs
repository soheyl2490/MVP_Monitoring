using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MVP_Monitoring.Domain.Entities;

namespace MVP_Monitoring.Infra.Data.Devices.Configurations
{
    public class DeviceConfigurations
        : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .ToTable("BaseTblDevices");

            builder
                .HasMany(p => p.DeviceItems).WithOne(p => p.Device).HasForeignKey(p => p.DeviceId);
        }
    }
}
