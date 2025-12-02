using Microsoft.EntityFrameworkCore;
using ProductsApi.Models;

namespace ProductsApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder
            .Entity<Product>()
            .HasData(
                new Product
                {
                    Id = 1,
                    Name = "Laptop",
                    Description = "High-performance laptop",
                    Price = 1299.99m,
                },
                new Product
                {
                    Id = 2,
                    Name = "Mouse",
                    Description = "Wireless mouse",
                    Price = 29.99m,
                },
                new Product
                {
                    Id = 3,
                    Name = "Keyboard",
                    Description = "Mechanical keyboard",
                    Price = 89.99m,
                },
                new Product
                {
                    Id = 4,
                    Name = "Monitor",
                    Description = "27-inch 4K monitor",
                    Price = 449.99m,
                },
                new Product
                {
                    Id = 5,
                    Name = "Headphones",
                    Description = "Noise-cancelling headphones",
                    Price = 199.99m,
                }
            );
    }
}
