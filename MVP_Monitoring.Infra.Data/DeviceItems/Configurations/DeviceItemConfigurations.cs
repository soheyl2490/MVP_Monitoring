using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MVP_Monitoring.Domain.Entities;

namespace MVP_Monitoring.Infra.Data.DeviceItems.Configurations
{
    public class DeviceItemConfigurations
        : IEntityTypeConfiguration<DeviceItem>
    {
        public void Configure(EntityTypeBuilder<DeviceItem> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .ToTable("BaseTblDeviceItems");

            builder
                .HasMany(p => p.deviceItemParametersValues).WithOne(p => p.DeviceItem).HasForeignKey(p => p.DeviceItemId);
        }
    }
}
