using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mg.Models
{
	public class Score : Entity
	{
		public virtual string Name { get; set; }
		public virtual int Value { get; set; }
		public virtual DateTime Date { get; set; }
	}
}