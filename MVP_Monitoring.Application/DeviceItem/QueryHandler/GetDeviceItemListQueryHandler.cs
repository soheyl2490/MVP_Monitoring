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
    public class GetDeviceItemListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceItemListQuery, List<DeviceItemListViewModel>>
    {
        public async Task<Result<List<DeviceItemListViewModel>>> Handle(GetDeviceItemListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<List<DeviceItemListViewModel>>();
            IList<Domain.Entities.DeviceItem> entity;
            entity = await unitOfWork.DeviceItems
                .GetAllAsync();
            var viewModel = mapper
              .Map<List<DeviceItemListViewModel>>(entity.OrderByDescending(p => p.Id));
            result.WithValue(viewModel);
            return result;
        }
    }
}
