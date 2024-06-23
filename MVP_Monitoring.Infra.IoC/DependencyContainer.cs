using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MVP_Monitoring.Application.Device;
using MVP_Monitoring.Application.DeviceItemParametersValue.CommandHandler;
using MVP_Monitoring.Application.DeviceItemParametersValue.Commands;
using MVP_Monitoring.Domain.UnitOfWork;
using MVP_Monitoring.Infra.Data.Common.Context;
using MVP_Monitoring.Infra.Data.Common.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Infra.IoC
{
    public static class DependencyContainer
    {
        static DependencyContainer()
        {
        }

        public static void ConfigureServices
            (IConfiguration configuration, IServiceCollection services)
        {
            #region Db

            services.AddDbContext<DataBaseContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("ConnectionString"));
            });

            #endregion

            #region  CorsPolicy

            services.AddCors(option =>
            {
                option.AddPolicy("AllowAnyOrigin",
                item =>
                {
                    //item.WithOrigins("https://127.0.0.1:5001")
                    item.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            #endregion

            // **************************************************
            services.AddTransient
                <IHttpContextAccessor, HttpContextAccessor>();

            // **************************************************


            // **************************************************
            services.AddAutoMapper
                (typeof(MappingProfile));
            // **************************************************

            // **************************************************
            services
                .AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(InsertDeviceItemParametersValueCommand).Assembly));
            // **************************************************

            // **************************************************
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            // **************************************************
        }
    }
}
