const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint




// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// create a new tag
//or does this need to be like the product-routes.js Product.create?
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});






// update a tag's name by its `id` value
// router.put('/:id', async (req, res) => {
//   try {
//     const tagData = await Tag.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     })
//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// update a tag's name by its `id` value
//structured after the product-routes.js update product route
router.put('/:id', (req, res) => {
  // update tag data
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated products from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});



// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
