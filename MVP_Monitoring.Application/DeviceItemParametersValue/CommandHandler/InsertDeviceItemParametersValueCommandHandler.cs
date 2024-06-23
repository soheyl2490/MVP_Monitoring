using AutoMapper;
using FluentResults;
using MVP_Monitoring.Application.Common.Mediator;
using MVP_Monitoring.Application.DeviceItemParametersValue.Commands;
using MVP_Monitoring.Domain.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.DeviceItemParametersValue.CommandHandler
{
    public class InsertDeviceItemParametersValueCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : ICommandHandler<InsertDeviceItemParametersValueCommand>
    {
        public async Task<Result> Handle(InsertDeviceItemParametersValueCommand request, CancellationToken cancellationToken)
        {
            var result = new Result();

            var entity = mapper.Map<MVP_Monitoring.Domain.Entities.DeviceItemParametersValue>(request);

            await unitOfWork.DeviceItemParametersValue.InsertAsync(entity);

            await unitOfWork.SaveAsync();

            result.WithSuccess("اطلاعات با موفقیت اضافه شد");

            return result;
        }
    }
}
