using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Misa.Common;
using MySql.Data.MySqlClient;

namespace Misa.Infrastructure
{
    public class DbConnector
    {
        protected string connectionString = "User Id=nvmanh; Host=103.124.92.43; Database=MS1_13_VVLONG_CukCuk; port=3306; password=12345678; character Set=utf8";
        protected IDbConnection dbConnection;
        public DbConnector()
        {
            dbConnection = new MySqlConnection(connectionString);
        }
        /*=========================================
         * hàm lấy dữ liệu từ server
         * Create by VVLONG (04/01/2021)
         */
        public IEnumerable<M> GetAllData<M>()
        {
            var tableName = typeof(M).Name;
            var sqlQuery = $"Proc_Get{tableName}s";
            var entity = dbConnection.Query<M>(sqlQuery, commandType: CommandType.StoredProcedure);
            return entity;
        }

        /*================================
         * lấy dữ liệu theo code
         * Create by VVLONG
         */
        public IEnumerable<M> GetByCode<M>(string code)
        {
            var tableName = typeof(M).Name;
            var sqlQuery = $"Proc_Get{tableName}byCode";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@{tableName}Code", code);
            var entity = dbConnection.Query<M>(sqlQuery, dynamicParameters, commandType: CommandType.StoredProcedure);
            return entity;
        }
        //insert du lieu
        public int InsertData<M>(M entity)
        {
            var tableName = typeof(M).Name;
            var sqlQuery = $"Proc_Post{tableName}";
            DynamicParameters dynamicParameters = new DynamicParameters();
            var properties = typeof(M).GetProperties();
            foreach(var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                dynamicParameters.Add($"@{propertyName}", propertyValue);
            }
            var effectRows = dbConnection.Execute(sqlQuery, dynamicParameters, commandType: CommandType.StoredProcedure);
            return effectRows;
        }

        public int UpdateData<M>(string id,M entity)
        {
            var tableName = typeof(M).Name;
            var sqlQuery = $"Proc_Put{tableName}";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@EmployeeID", id);
            var properties = typeof(M).GetProperties();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                dynamicParameters.Add($"@{propertyName}", propertyValue);
            }
            var effectRows = dbConnection.Execute(sqlQuery, dynamicParameters, commandType: CommandType.StoredProcedure);
            return effectRows;
        }

        public int Delete<M>(string code)
        {
            var tableName = typeof(M).Name;
            var sqlQuery = $"Proc_Delete{tableName}";
            var result = dbConnection.Execute(sqlQuery, new {Code=code}, commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
