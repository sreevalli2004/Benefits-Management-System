const express = require('express');
const router = express.Router();
const controller = require('../controllers/benefits');

router.post('/benefits', controller.createBenefit);
router.get('/benefits', controller.getAllBenefits);
router.get('/benefits/:id', controller.getBenefitById);
router.put('/benefits/:id', controller.UpdateBenefit);
router.delete('/benefits/:id', controller.deleteBenefit);

module.exports=router;