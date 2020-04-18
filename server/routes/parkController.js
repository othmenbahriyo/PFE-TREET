var express = require('express');
var router = express.Router();
var lisP = require('../models/parking');


var ObjectId = require('mongoose').Types.ObjectId;



/* ------------------------------------------ traja3lik list ta3 les parking l kol -------------------------*/
router.get('/list/parking', function(req,res)  {
    lisP.find({})
    .exec(function(err, lisP){
      if(err){
        console.log("err");
      } else{
        res.json(lisP);
      }
    });
  });

/*----------------------------------------------------------bch tzid parking--------------------------------------*/

router.post('/addParking', (req, res) => {
    var list = new lisP();
    list.name = req.body.name;
    list.longitude = req.body.longitude;
    list.latitude = req.body.latitude;
    list.price = req.body.price;
    list.nbplace = req.body.nbplace;
    list.capteur = req.body.capteur;
    
     list.save((err, registeredUser) => {
       if (err) {
         console.log(err)      
       } else {
       res.json(list)
       }
     })
   })

 /*-------------------------------------------------bch tfasa5 parking-------------------------------------------*/
 router.delete('/list/p/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    lisP.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in park Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  }); 


  /*----------------------------------------------- bch tmodifi parking khw mrigle ----------------------------------------*/
  router.put('/list/m/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var park = {
      name: req.body.name,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      price: req.body.price,
      nbplace: req.body.nbplace,
      capteur: req.body.capteur
    };
    lisP.findByIdAndUpdate(req.params.id, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Message Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router