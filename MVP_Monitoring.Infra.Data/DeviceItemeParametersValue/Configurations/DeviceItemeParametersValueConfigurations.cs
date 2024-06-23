using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MVP_Monitoring.Domain.Entities;

namespace MVP_Monitoring.Infra.Data.DeviceItemeParametersValue.Configurations
{
    public class DeviceItemeParametersValueConfigurations
        : IEntityTypeConfiguration<DeviceItemParametersValue>
    {
        public void Configure(EntityTypeBuilder<DeviceItemParametersValue> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .ToTable("BaseTblDeviceItemParametersValues");
        }
    }
}
