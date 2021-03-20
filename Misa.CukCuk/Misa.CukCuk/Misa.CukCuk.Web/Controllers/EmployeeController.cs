using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Misa.ApplicationCore;
using Misa.Common;
using Misa.Infrastructure;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Misa.CukCuk.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        DbConnector dbConnector;
        public EmployeeController()
        {
            dbConnector = new DbConnector();
        }
        // GET: api/<EmployeeControllers>
        [HttpGet()]
        public IActionResult Get()
        {
            return Ok(dbConnector.GetAllData<Employee>());
        }

        // GET api/<EmployeeControllers>/5
        [HttpGet("{code}")]
        public IActionResult Get(string code)
        {
            return Ok(dbConnector.GetByCode<Employee>(code));
        }


        // POST api/<EmployeeControllers>
        [HttpPost]
        public Boolean Post([FromBody] Employee value)
        {
            EmployeeAC employeeAC = new EmployeeAC();
            var result = employeeAC.InsertEmployee(value);
            if (result == -1) return false;
            else return true;
        }

        // PUT api/<EmployeeControllers>/5
        [HttpPut("{code}")]
        public Boolean Put(string id, [FromBody] Employee employee)
        {
            EmployeeAC employeeAC = new EmployeeAC();
            var result = employeeAC.UpdateEmployee(id, employee);
            if (result > 0) return true;
            else return false;
        }

        // DELETE api/<EmployeeControllers>/5
        [HttpDelete("{code}")]
        public Boolean Delete(string code)
        {
            var result = dbConnector.Delete<Employee>(code);
            if (result > 0) return true;
            else return false; 
        }
    } 
}
