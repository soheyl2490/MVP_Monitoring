

namespace MVP_Monitoring.Application.Common.Mediator
{
    public interface ICommand : MediatR.IRequest<FluentResults.Result>
    {

    }

    public interface ICommand<TReturnValue> : MediatR.IRequest<FluentResults.Result<TReturnValue>>
    {

    }
}
