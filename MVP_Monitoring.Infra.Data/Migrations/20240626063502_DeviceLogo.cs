using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MVP_Monitoring.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class DeviceLogo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "BaseTblDevices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "BaseTblDevices");
        }
    }
}
