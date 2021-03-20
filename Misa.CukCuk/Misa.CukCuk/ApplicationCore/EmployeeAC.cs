using System;
using System.Collections.Generic;
using System.Text;
using Misa.Common;
using Misa.Infrastructure;

namespace Misa.ApplicationCore
{
    public class EmployeeAC
    {
        public int InsertEmployee(Employee employee)
        {
            EmployeeIS employeeIS = new EmployeeIS();
            if (employeeIS.CheckEmployeeCode(employee.EmployeeCode) == true) return -1;
            else return employeeIS.InsertData(employee);
        }

        public int UpdateEmployee(string id, Employee employee)
        {
            EmployeeIS employeeIS = new EmployeeIS();
            var effectRows = employeeIS.UpdateData(id, employee);
            return effectRows;
        }
    }
}
