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
    public class InsertDeviceItemParametersValueListCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : ICommandHandler<InsertDeviceItemParametersValueListCommand>
    {
        public async Task<Result> Handle(InsertDeviceItemParametersValueListCommand request, CancellationToken cancellationToken)
        {
            var result = new Result();
            foreach (var deviceItemParametersValue in request.deviceItemParametersValuesList)
            {
                var entity = mapper.Map<MVP_Monitoring.Domain.Entities.DeviceItemParametersValue>(deviceItemParametersValue);
                await unitOfWork.DeviceItemParametersValue.InsertAsync(entity);
            }
            await unitOfWork.SaveAsync();
            result.WithSuccess("اطلاعات با موفقیت اضافه شد");
            return result;
        }
    }
}
