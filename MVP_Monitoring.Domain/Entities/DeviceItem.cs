using MVP_Monitoring.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static MVP_Monitoring.Domain.Entities.Common.Enums;

namespace MVP_Monitoring.Domain.Entities
{
    public class DeviceItem : BaseEntity
    {
        public string Title { get; set; }

        public string? Descriptions { get; set; } = string.Empty;

        public long DeviceId { get; set; }

        public DeviceType DeviceType { get; set; }

        #region Relation
        public List<DeviceItemParametersValue> deviceItemParametersValues { get; set; }

        [ForeignKey(nameof(DeviceId))]
        public Device Device { get; set; }

        #endregion
    }
}
