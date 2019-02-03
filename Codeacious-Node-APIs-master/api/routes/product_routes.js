const express = require('express');
const router = express.Router();

const prodList = require('../controllers/product_controller');
const listingList = require('../controllers/listing_controller');
const userList = require('../controllers/user_controller');
const inventoryList = require('../controllers/inventory_controller');

// var profile_pic = require('../../product/profile_pic');


// Product Routes
router.get('/products',prodList.list_all_products)
router.post('/products',prodList.create_a_product);



router.get('/products/:prodId',prodList.read_a_product)
router.put('/products/:prodId',prodList.update_a_product)
router.delete('/products/:prodId',prodList.delete_a_product);

//Listing Routes
router.get('/listings',listingList.list_all_listings)
router.post('/listings',listingList.create_a_listing)


router.get('/listings/:listId',listingList.read_a_listing)
router.put('/listings/:listId',listingList.update_a_listing)
router.delete('/listings/:listId',listingList.delete_a_listing);

//User Routes
router.get('/users',userList.list_all_users)
router.post('/users',userList.create_a_user);


router.get('/users/:userId',userList.read_a_user)
router.put('/users/:userId',userList.update_a_user)
router.delete('/users/:userId',userList.delete_a_user);

// Inventory Routes

router.get('/inventories',inventoryList.list_all_inventories)
router.post('/inventories',inventoryList.create_a_inventory);



router.get('/inventories/:inventoryId',inventoryList.read_a_inventory)
router.put('/inventories/:inventoryId',inventoryList.update_a_inventory)
router.delete('/inventories/:inventoryId',inventoryList.delete_a_inventory);



module.exports = router;
