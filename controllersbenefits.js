const db = require('../models/modelsbenefits');

exports.createBenefit = (req,res) => {
    var benefit = req.body;
    db.createBenefit(benefit,(err) => {
        if(err) {
            console.error('error',err);
            res.status(500).send('error creating benefit');
            return;
        }
        res.status(200).send('created successfully');
    });
};

exports.getAllBenefits = (req,res) => {
    db.getAllBenefits((err,benefits) => {
        if(err) {
            console.error('error',err);
            res.status(500).send('error getting benefit');
            return;
        } 
        res.send(benefits);
    });
};

exports.getBenefitById = (req,res) => {
    var benefitId = req.params.id;
    db.getBenefitById(benefitId,(err,benefit) => {
        if(err) {
            console.error('error',err);
            res.status(500).send('error getting benefit');
            return;
        }
        if(!benefit) {
            console.error('not found',err);
            res.status(404).send('not found');
            return;
        }
        res.send(benefit);
    });
};

exports.UpdateBenefit = (req,res) => {
    var benefitId = req.params.id;
    var updatedbenefit = req.body;
    db.updateBenefit(benefitId,updatedbenefit,(err,result) => {
        if(err) {
            console.error('error',err);
            res.status(500).send('error updating benefit');
            return;
        }
        if(result.affectedRows === 0) {
            console.error('not found',err);
            res.status(404).send('not found');
            return;
        }
        res.send('updated successfully');
    });
};

exports.deleteBenefit = (req,res) => {
    var benefitId = req.params.id;
    db.deleteBenefit(benefitId,(err,result) => {
        if(err) {
            console.error('error',err);
            res.status(500).send('error deleting benefit');
            return;
        }
        if(result.affectedRows === 0) {
            console.error('not found',err);
            res.status(404).send('not found');
            return;
        }
        res.send('deleted successfully');
    });
};