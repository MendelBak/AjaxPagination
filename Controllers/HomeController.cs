using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Data;
using AjaxPagination.Models;

namespace AjaxPagination.Controllers
{

    public class HomeController : Controller
    {
        private UserContext _context;

        public HomeController(UserContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            // This variable determines how many results to display per "page" and subsequently how many "pages" the view needs to display them all.
            int UsersPerPage = 3;
            List<User> AllUsers = _context.Users.Take(UsersPerPage).ToList();
            ViewBag.NumOfPages = (_context.Users.Count() / 3);
            ViewBag.AllUsers = AllUsers;
            return View();
        }


        // I can build two additional overloaded methods here, that take in 1) LastName, 2) LastName, StartDate, 3) LastName, StartDate, EndDate.
        // Instead of overloaded methods, I'm going to make this single FilterUsers method have default Start and End dates.
        [HttpPost]
        [Route("FilterUsers")]
        public JsonResult FilterUsers(string LastName, DateTime? StartDate = null, DateTime? EndDate = null, int selectedPage = 1)
        {
            List<User> AllUsers;
            int UsersPerPage = 3;

            // There are waaay too many if/else checks here. There has to be a better way to do this. This feels like an immensely poor implementation.
            if (LastName == "GetAllUsers" && StartDate == null && EndDate == null)
            {
                AllUsers = _context.Users.Skip(selectedPage * UsersPerPage - 3).Take(UsersPerPage).ToList();
            }
            else if (LastName == "GetAllUsers" && StartDate != null && EndDate == null)
            {
                AllUsers = _context.Users.Where(user => (user.created_at > (DateTime)StartDate)).ToList();
            }
            else if (LastName == "GetAllUsers" && EndDate != null && StartDate == null)
            {
                AllUsers = _context.Users.Where(user => (user.created_at < (DateTime)EndDate)).ToList();
            }
            else if (LastName == "GetAllUsers" && EndDate != null && StartDate != null)
            {
                AllUsers = _context.Users.Where(user => (user.created_at > (DateTime)StartDate) && (user.created_at < (DateTime)EndDate)).ToList();
            }
            else if (StartDate == null && EndDate == null)
            {
                AllUsers = _context.Users.Where(user => (user.last_name == LastName.First().ToString().ToUpper().Trim()) || (user.last_name == LastName)).ToList();
            }
            else if (EndDate == null)
            {
                AllUsers = _context.Users.Where(user => (user.last_name == LastName.First().ToString().ToUpper().Trim()) || (user.last_name == LastName) && (user.created_at > (DateTime)StartDate)).ToList();
            }
            else if (StartDate == null)
            {
                AllUsers = _context.Users.Where(user => (user.last_name == LastName.First().ToString().ToUpper().Trim()) || (user.last_name == LastName) && (user.created_at < (DateTime)EndDate)).ToList();
            }
            else
            {
                AllUsers = _context.Users.Where(user => (user.last_name == LastName.First().ToString().ToUpper().Trim()) || (user.last_name == LastName) && (user.created_at > (DateTime)StartDate) && (user.created_at < (DateTime)EndDate)).ToList();
            }
            ViewBag.UsersPerPage = UsersPerPage;
            ViewBag.AllUsers = AllUsers;
            return Json(AllUsers);
        }
    }
}
