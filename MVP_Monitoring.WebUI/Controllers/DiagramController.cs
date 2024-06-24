using Microsoft.AspNetCore.Mvc;

namespace MVP_Monitoring.WebUI.Controllers
{
    public class DiagramController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
