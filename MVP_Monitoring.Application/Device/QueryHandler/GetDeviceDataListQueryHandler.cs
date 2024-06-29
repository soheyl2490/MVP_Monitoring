using AutoMapper;
using FluentResults;
using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Application.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MVP_Monitoring.Domain.UnitOfWork;
using MVP_Monitoring.Application.Device.Queries;
using MVP_Monitoring.Domain.Models.ViewModels;
using MVP_Monitoring.Domain.Entities.Common;
using MVP_Monitoring.Infra.Data.Devices.Repositories;
using MVP_Monitoring.Domain.Repositories;
using MVP_Monitoring.Domain.Entities;

namespace MVP_Monitoring.Application.Device.QueryHandler
{
    public class GetDeviceDataListQueryHandler(IDeviceRepository deviceRepository, IMapper mapper) : IQueryHandler<GetDeviceDataListQuery, DeviceDataListViewModel>
    {
        public async Task<Result<DeviceDataListViewModel>> Handle(GetDeviceDataListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<DeviceDataListViewModel>();

            var entity =await deviceRepository
                .GetDeviceDataAsync(request.DeviceId);

            var viewModel = mapper
                .Map<DeviceDataListViewModel>(entity);

            result.WithValue(viewModel);

            return result;
        }
    }
}
