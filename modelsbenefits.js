var config = require('../config/config');
var mysql = require('mysql2');
var db=mysql.createConnection(config);

db.connect((err) => {
    if(err) {
        console.error('could not connect',err);
        return;
    }
    console.log('connection established');
});

exports.createBenefit = (benefit,callback) => {
    db.query (
        'insert into benefits(benefit_name,description,eligibility_criteria,coverage_amount,start_date,end_date) values (?,?,?,?,?,?) ',
        [benefit.benefit_name,benefit.description,benefit.eligibility_criteria,benefit.coverage_amount,benefit.start_date,benefit.end_date]
        ,callback
    );
}

exports.getAllBenefits = (callback) => {
    db.query (
        'select * from benefits',callback
    );
}

exports.getBenefitById = (benefitId,callback) => {
    db.query (
        'select * from benefits where id=?',benefitId,(err,res)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,res[0]);
        }
    );
}

exports.updateBenefit = (benefitId,updatedbenefit,callback) => {
    db.query (
        'update benefits set ? where id=?',[updatedbenefit,benefitId],callback
    );
}

exports.deleteBenefit = (benefitId,callback) => {
    db.query (
        'delete from benefits where id=?',benefitId,callback
    );
}