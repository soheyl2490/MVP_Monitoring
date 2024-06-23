using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Application.Common.Mediator
{
    public interface IQuery : MediatR.IRequest<FluentResults.Result>
    {

    }

    public interface IQuery<TReturnValue> : MediatR.IRequest<FluentResults.Result<TReturnValue>>
    {

    }
}
