using AutoMapper;
using MD_TamIranKhodro.Presentaion.Controllers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVP_Monitoring.Application.DeviceItemParametersValue.Commands;
using MVP_Monitoring.Application.DeviceItemParametersValue.Queries;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MVP_Monitoring.WebUI.Controllers
{
    
    public class DeviceItemParametersValueController(IMediator mediator, IMapper mapper, IConfiguration config) : BaseController(mediator)
    {
        
        [Route("DeviceItemsParameters/GetAll")]
        [HttpGet]
        public async Task<IActionResult> GeAllt()
        {
            GetDeviceItemParametersValueListQuery query =new GetDeviceItemParametersValueListQuery(); 
            var Result=FluentResult(await Mediator.Send(query));
            return Result;
        }
        [Route("DeviceItemsParameters/Insert")]
        [HttpGet]
        public async Task<IActionResult> Insert(int DeviceItemId)
        {
            int Temperature_min = config.GetValue<int>("Temperature_min");
            int Temperature_Max = config.GetValue<int>("Temperature_Max");
            int RotationSpeed_min = config.GetValue<int>("RotationSpeed_min");
            int RotationSpeed_Max = config.GetValue<int>("RotationSpeed_Max");
            int MotorFlow_min = config.GetValue<int>("MotorFlow_min");
            int MotorFlow_Max = config.GetValue<int>("MotorFlow_Max");
            int BearingTemperature_min = config.GetValue<int>("BearingTemperature_min");
            int BearingTemperature_Max = config.GetValue<int>("BearingTemperature_Max");
            Random r = new Random();
            int rInt = r.Next(0, 100);
            InsertDeviceItemParametersValueCommand insertDeviceItemParametersValueCommand = new InsertDeviceItemParametersValueCommand
            {
                DeviceItemId = DeviceItemId,
                Temperature = r.Next(Temperature_min, Temperature_Max),
                RotationSpeed = r.Next(RotationSpeed_min, RotationSpeed_Max),
                MotorFlow = r.Next(MotorFlow_min, MotorFlow_min),
                BearingTemperature = r.Next(BearingTemperature_min, BearingTemperature_Max)
            };
            var Result = FluentResult(await Mediator.Send(insertDeviceItemParametersValueCommand));
            return Result;
        }
    }
}
