using Microsoft.AspNetCore.Mvc;

namespace MVP_Monitoring.WebUI.Controllers
{
    public class DiagramController : Controller
    {
        public async Task<IActionResult> Index()
        {
            return View();
        }

        public async Task<IActionResult> DeviceItems(long id)
        {
            return View();
        }
    }
}
