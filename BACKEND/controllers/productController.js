const Products = require('../modules/Product'); // Ensure correct import

// // Create a product
// exports.createProducts = async (req, res) => {
//   try {
//     const product = new Product(req.body); // Use "Products" as per your request
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.createProducts = async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    });
    await product.save();
    console.log("Product saved:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};


// Read all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Use "Products"
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProducts = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id); // Use "Products"
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
