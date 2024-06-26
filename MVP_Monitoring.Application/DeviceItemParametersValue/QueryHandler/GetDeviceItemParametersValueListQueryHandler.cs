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
    public class GetDeviceItemParametersValueListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : IQueryHandler<GetDeviceItemParametersValueListQuery, PagingViewModel<DeviceItemParametersValueViewModel>>
    {
        public async Task<Result<PagingViewModel<DeviceItemParametersValueViewModel>>> Handle(GetDeviceItemParametersValueListQuery request, CancellationToken cancellationToken)
        {
            var result = new Result<PagingViewModel<DeviceItemParametersValueViewModel>>();

            var take = 10;
            IList<Domain.Entities.DeviceItemParametersValue> entity;
            var count = 0;
            entity = await unitOfWork.DeviceItemParametersValue
                .GetAllAsync();
            var viewModel = mapper
                .Map<List<DeviceItemParametersValueViewModel>>(entity.OrderByDescending(p => p.Id));
            result.WithValue(new PagingViewModel<DeviceItemParametersValueViewModel>()
            {
                //PageCount = count.CalculatePageCount(take),
                Results = viewModel
            });
            return result;
        }
    }
}

