import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';
import 'dotenv/config';

const sampleProducts = [
  {
    name: 'Striped Polo',
    description: 'Casual striped polo shirt - Perfect for everyday wear',
    price: 2499,
    category: 'Clothing',
    subCategory: 'Tops',
    bestseller: false,
    sizes: ['S','M','L','XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/05/26/14/20/polo-8022816_1280.jpg',
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/03/01/10/00/shirt-7823848_1280.jpg'
    ]
  },
  {
    name: 'Classic Hoodie',
    description: 'Warm and comfortable hoodie - Perfect for cold weather',
    price: 3999,
    category: 'Clothing',
    subCategory: 'Winterwear',
    bestseller: true,
    sizes: ['S','M','L','XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/09/24/13/18/hoodie-8271873_1280.jpg',
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/07/31/16/54/hoodie-8160305_1280.jpg'
    ]
  },
  {
    name: 'Denim Jacket',
    description: 'Stylish denim jacket - A timeless classic',
    price: 5999,
    category: 'Outerwear',
    subCategory: 'Jackets',
    bestseller: false,
    sizes: ['M','L','XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/01/08/23/56/denim-jacket-7705847_1280.jpg',
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/04/12/11/55/jacket-7920314_1280.jpg'
    ]
  },
  {
    name: 'Summer Dress',
    description: 'Light and breezy summer dress',
    price: 3499,
    category: 'Clothing',
    subCategory: 'Dresses',
    bestseller: true,
    sizes: ['XS','S','M','L'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/03/10/13/48/dress-7843005_1280.jpg',
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/02/10/18/26/dress-7781994_1280.jpg'
    ]
  },
  {
    name: 'Casual Sneakers',
    description: 'Comfortable everyday sneakers',
    price: 4499,
    category: 'Footwear',
    subCategory: 'Shoes',
    bestseller: true,
    sizes: ['6','7','8','9','10'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/02/02/10/41/sneakers-7760387_1280.jpg',
      'https://res.cloudinary.com/demo/image/fetch/https://cdn.pixabay.com/photo/2023/04/24/14/12/sneakers-7946778_1280.jpg'
    ]
  }
];

const add = async () => {
  try {
    await connectDB();
    for (const p of sampleProducts) {
      const exists = await productModel.findOne({ name: p.name });
      if (!exists) {
        const prod = new productModel(p);
        await prod.save();
        console.log('Inserted:', p.name);
      } else {
        console.log('Already exists:', p.name);
      }
    }
    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

add();
