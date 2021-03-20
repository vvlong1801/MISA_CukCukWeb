using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Misa.Common;
using Misa.Infrastructure;
using Misa.ApplicationCore;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Misa.Cuk.Cuk.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // GET: api/<CustomersController>
        DbConnector dbConnector;
        public CustomerController()
        {
            dbConnector = new DbConnector();
        }

        [HttpGet()]
        public IActionResult Get()
        {
            return Ok(dbConnector.GetAllData<Customer>());
        }

        [HttpGet("{code}")]
        public IActionResult Get(string code)
        {
            return Ok(dbConnector.GetByCode<Customer>(code));
        }
        // POST api/<CustomersController>
        [HttpPost()]
        public Boolean Post([FromBody] Customer customer)
        {
            CustomerAC customerAC = new CustomerAC();
            var affectRows = customerAC.InsertCustomer(customer);
            if (affectRows == -1) return false;
            else return true;
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] string value)
        {

        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
