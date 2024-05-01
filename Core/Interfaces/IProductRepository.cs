using Core.Entities;
using Core.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetByIdAsync(int id);
        Task<List<Product>> GetAllAsync(ProductParams parameters);
        Task<List<Brand>> GetBrandsAsync();
        Task<List<Category>> GetCategoriesAsync();
        Task<int> CountAsync(ProductParams parameters);
    }
}
