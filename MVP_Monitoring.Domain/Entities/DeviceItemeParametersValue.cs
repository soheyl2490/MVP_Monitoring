using MVP_Monitoring.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Entities
{
    public class DeviceItemParametersValue : BaseEntity
    {
        public long DeviceItemId { get; set; }

        public int Temperature { get; set; }

        public int RotationSpeed { get; set; }

        public int MotorFlow { get; set; }

        public int BearingTemperature { get; set; }

        #region Relation

        [ForeignKey(nameof(DeviceItemId))]
        public DeviceItem DeviceItem{ get; set; }

        #endregion
    }
}
