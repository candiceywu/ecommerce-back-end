const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//retrieve info on all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          // through: ProductTag, 
        },
      ],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          // through: ProductTag,
        },
      ],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
