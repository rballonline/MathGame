using System;
using System.Configuration;
using System.Data;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.PostgreSQL;
using System.Linq;

namespace Mg.Services
{
	public class BaseService
	{
		protected virtual string ConnectionString { get; set; }

		public IDbConnection OpenDbConnection(string connString = null)
		{
			OrmLiteConfig.DialectProvider = PostgreSQLDialectProvider.Instance;
			OrmLiteConfig.DialectProvider.NamingStrategy = new OrmLiteNamingStrategyBase();
			OrmLiteConfig.ClearCache();

			var uri = new Uri("postgres://uoznodii:gnF9QDFrBI24WXY1NN5JGoicagDfpH4E@babar.elephantsql.com:5432/uoznodii");
			ConnectionString = string.Format("Server={0};Port={1};Database={2};User Id={3};Password={4};",
					uri.Host, uri.Port, uri.AbsolutePath.Trim('/'), uri.UserInfo.Split(':').First(),
					uri.UserInfo.Split(':').Last());

			//ConnectionString = ConfigurationManager.ConnectionStrings["Database"].ConnectionString;
			connString = connString ?? ConnectionString;

			return connString.OpenDbConnection();
		}
	}
}