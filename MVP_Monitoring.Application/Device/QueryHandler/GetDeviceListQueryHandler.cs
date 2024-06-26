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
    public class GetDeviceListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceListQuery, PagingViewModel<DeviceViewModel>>
    {
        public async Task<Result<PagingViewModel<DeviceViewModel>>> Handle(GetDeviceListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<PagingViewModel<DeviceViewModel>>();
            var take = 10;
            IList<Domain.Entities.Device> entity;
            var count = 0;
                entity = await unitOfWork.Devices
                   .GetAllAsync();
            var viewModel = mapper
                .Map<List<DeviceViewModel>>(entity.OrderByDescending(p => p.Id));
            foreach (DeviceViewModel item in viewModel)
            {
                item.PersianCreateDate =Helpers.GetPersianDateFromEnglish(item.CreateDate);
            }
            result.WithValue(new PagingViewModel<DeviceViewModel>()
            {
                PageCount = count.CalculatePageCount(take),
                Results = viewModel
            });
            return result;
        }
    }
}
