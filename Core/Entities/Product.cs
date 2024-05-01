﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }

        public Brand Brand { get; set; }
        public int BrandId { get; set; }
    }
}
