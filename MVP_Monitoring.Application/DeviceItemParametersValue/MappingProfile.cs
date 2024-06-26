using AutoMapper;
using MVP_Monitoring.Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItemParametersValue
{
    public class MappingProfile : Profile
    {
        public MappingProfile() : base()
        {
            //CreateMap<RoleViewModel, InsertRoleCommand>();
            //CreateMap<UpdateGroupCommand, Domain.Entities.Group>();
            //CreateMap<Domain.Entities.Group, UpdateGroupCommand>();
            CreateMap<Domain.Entities.DeviceItemParametersValue, DeviceItemParametersValueViewModel>();
            
            //CreateMap<Domain.Entities.Device, DeviceViewModel>();

            //CreateMap<Domain.Entities.Group, InsertGroupCommand>();
            //CreateMap<InsertGroupCommand, Domain.Entities.Group>();

        }
    }
}
