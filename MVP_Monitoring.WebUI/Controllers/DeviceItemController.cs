using AutoMapper;
using MD_TamIranKhodro.Presentaion.Controllers;
using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using MVP_Monitoring.Application.Device.Queries;
using MVP_Monitoring.Application.DeviceItem.Queries;

namespace MVP_Monitoring.WebUI.Controllers
{
    public class DeviceItemController(IMediator mediator, IMapper mapper) : BaseController(mediator)
    {
        [Route("DeviceItems/GetAllIds")]
        [HttpGet]
        public async Task<IActionResult> GeAllIds()
        {
            GetDeviceItemIdsListQuery query = new GetDeviceItemIdsListQuery();
            var Result = FluentResult(await Mediator.Send(query));
            return Result;
        }

        [Route("DeviceItems/GetAll")]
        [HttpGet]
        public async Task<IActionResult> GeAll()
        {
            GetDeviceItemListQuery query = new GetDeviceItemListQuery();
            var Result = FluentResult(await Mediator.Send(query));
            return Result;
        }
    }

}
