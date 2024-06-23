namespace MVP_Monitoring.Application.Common.Mediator
{
    public interface IQueryHandler<in TCommand> : MediatR.IRequestHandler<TCommand, FluentResults.Result> where TCommand : MediatR.IRequest<FluentResults.Result>
    {

    }

    public interface IQueryHandler<in TCommand, TReturnValue> : MediatR.IRequestHandler<TCommand, FluentResults.Result<TReturnValue>> where TCommand : MediatR.IRequest<FluentResults.Result<TReturnValue>>
    {

    }
}
