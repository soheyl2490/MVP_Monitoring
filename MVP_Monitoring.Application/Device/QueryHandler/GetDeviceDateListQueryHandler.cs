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
    public class GetDeviceDataListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceDataListQuery, PagingViewModel<DeviceDataListViewModel>>
    {
        public async Task<Result<PagingViewModel<DeviceDataListViewModel>>> Handle(GetDeviceDataListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<PagingViewModel<DeviceDataListViewModel>>();
            var take = 10;
            IList<Domain.Entities.Device> entity;
            var count = 0;
                entity = await unitOfWork.Devices
                   .GetAllAsync();
            var viewModel = mapper
                .Map<List<DeviceDataListViewModel>>(entity.OrderByDescending(p => p.Id));
            foreach (DeviceDataListViewModel item in viewModel)
            {
                item.PersianCreateDate =Helpers.GetPersianDateFromEnglish(item.CreateDate);
            }
            result.WithValue(new PagingViewModel<DeviceDataListViewModel>()
            {
                PageCount = count.CalculatePageCount(take),
                Results = viewModel
            });
            return result;
        }
    }
}
