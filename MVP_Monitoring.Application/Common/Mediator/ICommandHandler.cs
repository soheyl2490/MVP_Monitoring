namespace MVP_Monitoring.Application.Common.Mediator
{
    public interface ICommandHandler<in TCommand> : MediatR.IRequestHandler<TCommand, FluentResults.Result> where TCommand : MediatR.IRequest<FluentResults.Result>
    {

    }

    public interface ICommandHandler<in TCommand, TReturnValue> : MediatR.IRequestHandler<TCommand, FluentResults.Result<TReturnValue>> where TCommand : MediatR.IRequest<FluentResults.Result<TReturnValue>>
    {

    }
}
