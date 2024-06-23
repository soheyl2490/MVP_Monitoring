using AutoMapper;
using FluentResults;
using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Application.Common;
using MVP_Monitoring.Domain.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MVP_Monitoring.Application.DeviceItemParametersValue.Queries;
using MVP_Monitoring.Domain.Models.ViewModels;

namespace MVP_Monitoring.Application.DeviceItemParametersValue.QueryHandler
{
    public class GetDeviceItemParametersValueListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceItemParametersValueListQuery, PagingViewModel<DeviceItemParametersValueListViewModel>>
    {
        public async Task<Result<PagingViewModel<DeviceItemParametersValueListViewModel>>> Handle(GetDeviceItemParametersValueListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<PagingViewModel<DeviceItemParametersValueListViewModel>>();

            var take = 10;
            IList<Domain.Entities.DeviceItemParametersValue> entity;
            var count = 0;
            //if (request.Page == -1)
            //{
                entity = await unitOfWork.DeviceItemParametersValue
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
                .Map<List<DeviceItemParametersValueListViewModel>>(entity.OrderByDescending(p => p.Id));

            result.WithValue(new PagingViewModel<DeviceItemParametersValueListViewModel>()
            {
                PageCount = count.CalculatePageCount(take),
                Results = viewModel
            });

            return result;
        }
    }
}
