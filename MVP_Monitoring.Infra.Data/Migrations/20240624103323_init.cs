using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MVP_Monitoring.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaseTblDevices",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descriptions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseTblDevices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BaseTblDeviceItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descriptions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceId = table.Column<long>(type: "bigint", nullable: false),
                    DeviceType = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseTblDeviceItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseTblDeviceItems_BaseTblDevices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "BaseTblDevices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BaseTblDeviceItemParametersValues",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeviceItemId = table.Column<long>(type: "bigint", nullable: false),
                    Temperature = table.Column<int>(type: "int", nullable: false),
                    RotationSpeed = table.Column<int>(type: "int", nullable: false),
                    MotorFlow = table.Column<int>(type: "int", nullable: false),
                    BearingTemperature = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseTblDeviceItemParametersValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseTblDeviceItemParametersValues_BaseTblDeviceItems_DeviceItemId",
                        column: x => x.DeviceItemId,
                        principalTable: "BaseTblDeviceItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaseTblDeviceItemParametersValues_DeviceItemId",
                table: "BaseTblDeviceItemParametersValues",
                column: "DeviceItemId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseTblDeviceItems_DeviceId",
                table: "BaseTblDeviceItems",
                column: "DeviceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaseTblDeviceItemParametersValues");

            migrationBuilder.DropTable(
                name: "BaseTblDeviceItems");

            migrationBuilder.DropTable(
                name: "BaseTblDevices");
        }
    }
}
