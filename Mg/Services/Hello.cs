using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack;
using ServiceStack.OrmLite.PostgreSQL;
using ServiceStack.OrmLite;
using Mg.Models;

namespace Mg.Services
{
	[Route("/hello")]
	[Route("/hello/{Name}")]
	public class Hello
	{
		public string Name { get; set; }
	}
	public class HelloResponse { public string Result { get; set; } }

	public class HelloService : BaseService, IService
	{
		public object Any(Hello request)
		{
			using (var db = OpenDbConnection())
			{
				var id = db.Insert<Score>(new Score { Date = DateTime.UtcNow, Name = "Will", Value = 100 }, true);
			}
			return new HelloResponse { Result = "Hello, " + request.Name };
		}
	} 
}