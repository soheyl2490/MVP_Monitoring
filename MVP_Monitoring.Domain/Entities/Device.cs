using MVP_Monitoring.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Entities
{
    public class Device:BaseEntity
    {
        public string Title { get; set; }

        public string Descriptions { get; set; }

        public long? ParentId { get; set; }


        #region Relation

        public List<DeviceItem> DeviceItems { get; set; }

        public string Logo { get; set; }
        #endregion
    }
}
