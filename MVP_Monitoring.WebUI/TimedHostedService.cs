using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MVP_Monitoring.Application.DeviceItem.Queries;
using MVP_Monitoring.Application.DeviceItemParametersValue.Commands;
using MVP_Monitoring.Domain.Entities;
using MVP_Monitoring.Domain.Models.ViewModels;

namespace MVP_Monitoring.WebUI
{
    public class TimedHostedService : IHostedService, IDisposable
    {
        bool isbusy = false;
        private int executionCount = 0;
        private readonly ILogger<TimedHostedService> _logger;
        private readonly IConfiguration _config;
        //private readonly IMediator _mediator;
        private IServiceScopeFactory _scopeFactory;
        private Timer? _timer = null;

        public TimedHostedService(ILogger<TimedHostedService> logger, IConfiguration config, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _config = config;
            
            _scopeFactory = scopeFactory;
        }

        public async Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(5));

            //return Task.CompletedTask;
        }

        private async void DoWork(object? state)
        {
            List<long> deviceItemIds;
            GetDeviceItemIdsListQuery getDeviceItemIdsListQuery = new GetDeviceItemIdsListQuery();
            using (var scope = _scopeFactory.CreateScope())
            {
                var _mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
                var result = await _mediator.Send(getDeviceItemIdsListQuery);
                deviceItemIds = result.Value.DevicveItemIds;
            }
            List<DeviceItemParametersValue> insertDeviceItemParametersValueCommand = new List<DeviceItemParametersValue>();
            InsertDeviceItemParametersValueListCommand insertDeviceItemParametersValueListCommand = new InsertDeviceItemParametersValueListCommand();
            int Temperature_min, Temperature_Max, RotationSpeed_min, RotationSpeed_Max, MotorFlow_min, MotorFlow_Max, BearingTemperature_min, BearingTemperature_Max;
            foreach (long deviceItemId in deviceItemIds)
            {
                Temperature_min = _config.GetValue<int>("Temperature_min");
                Temperature_Max = _config.GetValue<int>("Temperature_Max");
                RotationSpeed_min = _config.GetValue<int>("RotationSpeed_min");
                RotationSpeed_Max = _config.GetValue<int>("RotationSpeed_Max");
                MotorFlow_min = _config.GetValue<int>("MotorFlow_min");
                MotorFlow_Max = _config.GetValue<int>("MotorFlow_Max");
                BearingTemperature_min = _config.GetValue<int>("BearingTemperature_min");
                BearingTemperature_Max = _config.GetValue<int>("BearingTemperature_Max");
                Random r = new Random();
                int rInt = r.Next(0, 100);
                insertDeviceItemParametersValueCommand.Add(new DeviceItemParametersValue
                {
                    DeviceItemId = deviceItemId,
                    Temperature = r.Next(Temperature_min, Temperature_Max),
                    RotationSpeed = r.Next(RotationSpeed_min, RotationSpeed_Max),
                    MotorFlow = r.Next(MotorFlow_min, MotorFlow_Max),
                    BearingTemperature = r.Next(BearingTemperature_min, BearingTemperature_Max)
                });


            }
            insertDeviceItemParametersValueListCommand.deviceItemParametersValuesList = insertDeviceItemParametersValueCommand;
            using (var scope = _scopeFactory.CreateScope())
            {
                var _mediator=scope.ServiceProvider.GetRequiredService<IMediator>();
                await _mediator.Send(insertDeviceItemParametersValueListCommand);
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
