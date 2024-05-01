using Core.Entities;
using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class AppDbInitializer
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (!context.Brands.Any())
            {
                var brandsData = File.ReadAllText("brands.json");
                var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);
                context.Brands.AddRange(brands);
            }

            if (!context.Categories.Any())
            {
                var categoriesData = File.ReadAllText("categories.json");
                var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
                context.Categories.AddRange(categories);
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText("products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                context.Products.AddRange(products);
            }

            if (!context.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText("delivery.json");
                var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                context.DeliveryMethods.AddRange(deliveryMethods);
            }

            if (context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }
    }
}
