using AutoMapper;
using MVP_Monitoring.Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItem
{
    public class MappingProfile : Profile
    {
        public MappingProfile() : base()
        {
            CreateMap<Domain.Entities.DeviceItem, DeviceItemListViewModel>();
        }
    }
}
