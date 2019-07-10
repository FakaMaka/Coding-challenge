using Microsoft.EntityFrameworkCore;

namespace SC.CodingChallenge1.DB
{
  public class ProductContext : DbContext
  {
    public ProductContext(DbContextOptions<ProductContext> options) : base(options)
    { }

    public DbSet<Product> Products { get; set; }
  }
}
