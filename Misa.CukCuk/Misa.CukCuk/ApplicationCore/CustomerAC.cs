using System;
using System.Collections.Generic;
using System.Text;
using Misa.Common;
using Misa.Infrastructure;

namespace Misa.ApplicationCore
{
    public class CustomerAC
    {
        public int InsertCustomer(Customer customer)
        {
            CustomerIS customerIS = new CustomerIS();
            if (customerIS.CheckCustomerCode(customer.CustomerCode) == true) return -1;
            else return customerIS.InsertCustomer(customer);
        }
    }
}
