using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdGunuDekor.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCover : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCover",
                table: "GalleryImages",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCover",
                table: "GalleryImages");
        }
    }
}
