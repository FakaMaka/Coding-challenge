using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SC.CodingChallenge1.DB
{

  public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public bool IsActive { get; set; }
    public int Price { get; set; }
  }
}
