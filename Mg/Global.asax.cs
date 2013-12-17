using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ServiceStack;
using Mg.Services;
using Funq;

namespace Mg
{
	public class MvcApplication : System.Web.HttpApplication
	{
		public class AppHost : AppHostBase
		{
			//Tell Service Stack the name of your application and where to find your web services
			public AppHost() : base("Web Services", typeof(HelloService).Assembly) { }

			public override void Configure(Funq.Container container)
			{
				//register any dependencies your services use, e.g:
				//container.Register<ICacheClient>(new MemoryCacheClient());
			}
		}


		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();

			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);

			new AppHost().Init();
		}
	}
}