export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    category: string;
    brand: string;
}

export class Product implements Product {}