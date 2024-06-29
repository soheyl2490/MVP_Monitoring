using AutoMapper;
using MD_TamIranKhodro.Presentaion.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MVP_Monitoring.Application.Device.Queries;
using MVP_Monitoring.Application.DeviceItemParametersValue.Queries;

namespace MVP_Monitoring.WebUI.Controllers
{
    public class DeviceController(IMediator mediator, IMapper mapper) : BaseController(mediator)
    {
        [Route("Devices/GetAll")]
        [HttpGet]
        public async Task<IActionResult> GeAllt()
        {
            GetDeviceListQuery query = new GetDeviceListQuery();
            var Result = FluentResult(await Mediator.Send(query));
            return Result;
        }
        [Route("Devices/GetDeviceDataList")]
        [HttpGet]
        public async Task<IActionResult> GeDeviceDataList(int deviceId)
        {
            GetDeviceDataListQuery query = new GetDeviceDataListQuery()
            {
                DeviceId=deviceId
            };
            var Result = FluentResult(await Mediator.Send(query));
            return Result;
        }
    }
}
