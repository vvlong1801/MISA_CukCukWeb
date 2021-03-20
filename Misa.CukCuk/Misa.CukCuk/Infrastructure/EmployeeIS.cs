using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using Misa.Common;

namespace Misa.Infrastructure
{
    public class EmployeeIS: DbConnector
    {
        public int InsertEmployee(Employee employee) 
        {
            DbConnector dbConnector = new DbConnector();
            var effectRows = dbConnector.InsertData(employee);
            return effectRows;
        }

        public int UpdateEmployee(string id, Employee employee)
        {
            DbConnector dbConnector = new DbConnector();
            var effectRows = dbConnector.UpdateData(id, employee);
            return effectRows;
        }
        public bool CheckEmployeeCode(string EmployeeCode)
        {
            var employee = dbConnection.Query<Employee>($"SELECT*FROM Employee WHERE EmployeeCode = '{EmployeeCode}'").FirstOrDefault();
            if (employee != null) return true;
            else return false;
        }
    }
}
