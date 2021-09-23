const router = require('express').Router();
//require the category route
const categoryRoutes = require('./category-routes');
//require the product route
const productRoutes = require('./product-routes');
//require the tag route
const tagRoutes = require('./tag-routes');

//creates the routes for /api/categories
router.use('/categories', categoryRoutes);
//creates the routes for /api/products
router.use('/products', productRoutes);
//creates the routes for /api/tags
router.use('/tags', tagRoutes);

module.exports = router;
