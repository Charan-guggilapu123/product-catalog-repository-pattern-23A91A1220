const { Product, Category } = require('./models');

async function seed() {
  try {
    const categoryCount = await Category.count();
    if (categoryCount > 0) {
      console.log('Database already seeded.');
      return;
    }

    console.log('Seeding database...');

    const categories = await Category.bulkCreate([
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Books', description: 'Readables' },
      { name: 'Clothing', description: 'Wearables' }
    ]);

    const products = await Product.bulkCreate([
      { name: 'Laptop', description: 'High performance laptop', price: 999.99, sku: 'LPT-001' },
      { name: 'Smartphone', description: 'Latest model', price: 699.99, sku: 'PHN-001' },
      { name: 'Headphones', description: 'Noise cancelling', price: 199.99, sku: 'AUD-001' },
      { name: 'Novel', description: 'Best seller', price: 19.99, sku: 'BKS-001' },
      { name: 'T-Shirt', description: 'Cotton t-shirt', price: 9.99, sku: 'CLT-001' },
      { name: 'Jeans', description: 'Denim jeans', price: 49.99, sku: 'CLT-002' },
      { name: 'Mouse', description: 'Wireless mouse', price: 29.99, sku: 'ACC-001' },
      { name: 'Keyboard', description: 'Mechanical keyboard', price: 89.99, sku: 'ACC-002' },
      { name: 'Monitor', description: '4K monitor', price: 299.99, sku: 'DSP-001' },
      { name: 'Tablet', description: '10 inch tablet', price: 399.99, sku: 'TBL-001' }
    ]);

    // Associations
    // Electronics
    await products[0].addCategory(categories[0]);
    await products[1].addCategory(categories[0]);
    await products[2].addCategory(categories[0]);
    await products[6].addCategory(categories[0]);
    await products[7].addCategory(categories[0]);
    await products[8].addCategory(categories[0]);
    await products[9].addCategory(categories[0]);

    // Books
    await products[3].addCategory(categories[1]);

    // Clothing
    await products[4].addCategory(categories[2]);
    await products[5].addCategory(categories[2]);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seed;
