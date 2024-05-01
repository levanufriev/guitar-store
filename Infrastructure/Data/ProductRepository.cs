using Azure;
using Core.Entities;
using Core.Interfaces;
using Core.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> CountAsync(ProductParams parameters)
        {
            IQueryable<Product> query = _context.Products;

            if (parameters.BrandId.HasValue)
            {
                query = query.Where(p => p.BrandId == parameters.BrandId);
            }

            if (parameters.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == parameters.CategoryId);
            }

            if (!string.IsNullOrEmpty(parameters.Search))
            {
                query = query.Where(p => p.Name.Contains(parameters.Search));
            }

            return await query.CountAsync();
        }

        public async Task<List<Product>> GetAllAsync(ProductParams parameters)
        {
            IQueryable<Product> query = _context.Products;

            if (parameters.BrandId.HasValue)
            {
                query = query.Where(p => p.BrandId == parameters.BrandId);
            }

            if (parameters.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == parameters.CategoryId);
            }

            if (!string.IsNullOrEmpty(parameters.Search))
            {
                query = query.Where(p => p.Name.Contains(parameters.Search));
            }

            switch (parameters.Sort)
            {
                case "priceAsc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Name);
                    break;
            }

            query = query.Skip((parameters.PageIndex - 1) * parameters.PageSize).Take(parameters.PageSize);

            query = query.Include(p => p.Category).Include(p => p.Brand);

            return await query.ToListAsync();
        }

        public async Task<List<Brand>> GetBrandsAsync()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
