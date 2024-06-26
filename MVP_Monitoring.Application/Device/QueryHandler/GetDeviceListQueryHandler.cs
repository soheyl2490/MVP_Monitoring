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

namespace MVP_Monitoring.Application.Device.QueryHandler
{
    public class GetDeviceListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceListQuery, List<DeviceViewModel>>
    {
        public async Task<Result<List<DeviceViewModel>>> Handle(GetDeviceListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<List<DeviceViewModel>>();
            IList<Domain.Entities.Device> entity;
                entity = await unitOfWork.Devices
                   .GetAllAsync();
            var viewModel = mapper
                .Map<List<DeviceViewModel>>(entity.OrderByDescending(p => p.Id));
            foreach (DeviceViewModel item in viewModel)
            {
                item.PersianCreateDate =Helpers.GetPersianDateFromEnglish(item.CreateDate);
            }
            result.WithValue(viewModel);
            return result;
        }
    }
}
