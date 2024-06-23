namespace MVP_Monitoring.Domain.Models.ViewModels
{
    public class DeviceListViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }

        public string Descriptions { get; set; }

        public long? ParentId { get; set; }
    }
}
