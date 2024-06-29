using AutoMapper;
using FluentResults;
using MVP_Monitoring.Application.Common;
using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Application.Device.Queries;
using MVP_Monitoring.Domain.Entities.Common;
using MVP_Monitoring.Domain.Models.ViewModels;
using MVP_Monitoring.Domain.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItem.Queries
{
    public class GetDeviceItemIdsListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceItemIdsListQuery, DeviceItemIdsListViewModel>
    {
        public async Task<Result<DeviceItemIdsListViewModel>> Handle(GetDeviceItemIdsListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<DeviceItemIdsListViewModel>();

            var entity = await unitOfWork.DeviceItems
                   .GetManyAsync(p => !p.IsDeleted, p => p.Id);

            var viewModel = new DeviceItemIdsListViewModel
            {
                DevicveItemIds = entity.ToList()
            };
            result.WithValue(viewModel);
            return result;
        }
    }
}
