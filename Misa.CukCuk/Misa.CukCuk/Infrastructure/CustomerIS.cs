using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper;
using Misa.Common;

namespace Misa.Infrastructure
{
    public class CustomerIS : DbConnector
    {
        public int InsertCustomer(Customer customer)
        {
            DbConnector dbConnector = new DbConnector();
            return dbConnector.InsertData<Customer>(customer);
        }
        public bool CheckCustomerCode(string CustomerCode)
        {
            var customer = dbConnection.Query<Customer>($"SELECT*FROM Customer WHERE CustomerCode = '{CustomerCode}'").FirstOrDefault();
            if (customer != null) return true;
            else return false;
        }
    }
}
