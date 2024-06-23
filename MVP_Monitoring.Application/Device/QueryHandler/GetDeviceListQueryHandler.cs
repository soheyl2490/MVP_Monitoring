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

namespace MVP_Monitoring.Application.Device.QueryHandler
{
    public class GetDeviceListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceListQuery, PagingViewModel<DeviceListViewModel>>
    {
        public async Task<Result<PagingViewModel<DeviceListViewModel>>> Handle(GetDeviceListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<PagingViewModel<DeviceListViewModel>>();

            var take = 10;
            IList<Domain.Entities.Device> entity;
            var count = 0;
            //if (request.Page == -1)
            //{
                entity = await unitOfWork.Devices
                   .GetAllAsync();
            //}
            //else
            //{
            //    entity = await unitOfWork.Groups
            //    .GetManyAsync(p => !string.IsNullOrWhiteSpace(request.Filter) ?
            //    p.Name.Contains(request.Filter) ||
            //    p.Code.Contains(request.Filter) : true
            //    , request.Page.CalculateSkip(take), take);

            //    count = await unitOfWork.Groups
            //        .GetCountAsync(p => !string.IsNullOrWhiteSpace(request.Filter) ?
            //        p.Name.Contains(request.Filter) ||
            //        p.Code.Contains(request.Filter) : true);

            //}
            var viewModel = mapper
                .Map<List<DeviceListViewModel>>(entity.OrderByDescending(p => p.Id));

            result.WithValue(new PagingViewModel<DeviceListViewModel>()
            {
                PageCount = count.CalculatePageCount(take),
                Results = viewModel
            });

            return result;




        }
    }
}
