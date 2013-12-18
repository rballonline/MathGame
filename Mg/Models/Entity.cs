using System;
using ServiceStack.DataAnnotations;

namespace Mg.Models
{
	public class Entity
	{
		[AutoIncrement]
		public int Id { get; set; }
	}
}