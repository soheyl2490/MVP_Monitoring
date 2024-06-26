using AutoMapper;
using MD_TamIranKhodro.Presentaion.Controllers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVP_Monitoring.Application.DeviceItemParametersValue.Queries;

namespace MVP_Monitoring.WebUI.Controllers
{
    
    public class DeviceItemParametersValueController(IMediator mediator, IMapper mapper) : BaseController(mediator)
    {
        
        [Route("DeviceItemsParameters/GetAll")]
        [HttpGet]
        public async Task<IActionResult> GeAllt()
        {
            GetDeviceItemParametersValueListQuery query =new GetDeviceItemParametersValueListQuery(); 
            var Result=FluentResult(await Mediator.Send(query));
            return Result;
        }
    }
}
