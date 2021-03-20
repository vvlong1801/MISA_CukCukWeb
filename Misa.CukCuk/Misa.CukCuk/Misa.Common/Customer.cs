using System;
using System.Collections.Generic;
using System.Text;

namespace Misa.Common
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public string Id
        {
            get
            {
                return CustomerId.ToString();
            }
        }
        public string CustomerCode { get; set; }
        public string FullName { get; set; }
        public string MemberCardCode { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Gender { get; set; }
        public string GenderName
        {
            get
            {
                switch (Gender)
                {
                    case 0: return "Nam";
                    case 1: return "Nữ";
                    case 2: return "Khác";
                    default: return "";
                }
            }
        }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
    }
}
