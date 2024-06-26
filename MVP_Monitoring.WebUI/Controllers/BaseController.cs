using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MD_TamIranKhodro.Presentaion.Controllers
{
    public abstract class BaseController : Controller
    {
        public BaseController(IMediator mediator) : base()
        {
            Mediator = mediator;
        }

        protected IMediator Mediator { get; }


        public IActionResult
            FluentResult<T>(FluentResults.Result<T> result)
        {
            if (result.IsSuccess)
            {
                return Ok(value: result);
            }
            else
            {
                return BadRequest(error: result.ToResult());
            }
        }

        public IActionResult
            FluentResult(FluentResults.Result result)
        {
            if (result.IsSuccess)
            {
                return Ok(value: result);
            }
            else
            {
                return BadRequest(error: result);
            }
        }
    }
}
