using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SC.CodingChallenge1.DB;

namespace SC.CodingChallenge1.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductListController : ControllerBase
  {
    private ProductContext db;
    public ProductListController(ProductContext context)
    {
      db = context;
    }

    // GET: api/ProductList
    [HttpGet("[action]")]
    public IEnumerable<Product> Get()
    {
      return db.Products.ToList();
    }

    // GET: api/ProductList/5
    [HttpGet("{id}", Name = "Get")]
    public Product Get(int id)
    {
      return db.Products.Where(product => product.Id == id).First();
    }

    // POST: api/ProductList
    [HttpPost]
    public void Post([FromBody] Product value)
    {
      this.db.Add(value);
      this.db.SaveChanges();
    }

    // PUT: api/ProductList/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] Product value)
    {
      var editableProduct = this.db.Products.Single(p => p.Id == id);
      editableProduct.Name = value.Name;
      editableProduct.Category = value.Category;
      editableProduct.IsActive = value.IsActive;
      editableProduct.Price = value.Price;
      this.db.SaveChanges();

    }

    // DELETE: api/ProductList/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      this.db.Products.Remove(this.db.Products.Single(p => p.Id == id));
      this.db.SaveChanges();
    }
  }
}
