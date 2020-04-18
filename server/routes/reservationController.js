var express = require('express');
var router = express.Router();
var lis = require('../models/listRes');

var ObjectId = require('mongoose').Types.ObjectId;

/* -------------------------------------------- traja3lik list ta3 reservation ------------------------- */
router.get('/list/res', function(req,res)  {
    lis.find({})
    .exec(function(err, listRes){
      if(err){
        console.log("err");
      } else{
        res.json(listRes);
      }
    });
});

router.route('/:matricule').get(function (req, res)
{
   let matricule = req.params.matricule;
   lis.find({matricule},function (err, listRes) {
     if(err){
       console.log("err");
     } else{
       res.json(listRes);
     }
   });
   });

/*-------------------------------------------list ta3 reservation--------------------------------------------*/
router.post('/saveres', (req, res) => {
    var list = new lis();
    list.name = req.body.name;
    list.matricule = req.body.matricule;
    list.Tpark = req.body.Tpark;
    list.dateE = req.body.dateE;
    list.dateS = req.body.dateS;
    list.timeE = req.body.timeE;
    list.timeS = req.body.timeS;
    
     list.save((err, registeredUser) => {
       if (err) {
         console.log(err)      
       } else {
       res.json(list)
       }
     })
   })

/*--------------------------------------------bch tfasa5 7aja mil list ta3 reservation----------------------------*/
router.delete('/list/d/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    lis.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  });

  module.exports = router
 