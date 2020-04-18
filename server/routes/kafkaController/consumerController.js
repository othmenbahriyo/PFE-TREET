var Kafka = require('no-kafka');
const express = require('express');
var router = express.Router();


var consumer = new Kafka.SimpleConsumer();
consumer.init().then(function() {
  console.log("Consumer Ready");
});

router.get('/consume/:off', function(req, res) {
    consumer.subscribe("test", {
      offset: req.params.off,
      maxBytes: 1000
    }, function(messageSet, topic, partition) {          
      var msg = "";
      messageSet.some(function(m) {
        msg += m.message.value + " ";
        if (parseInt(m.offset) > 1000 ) {
          return true;
        }
      });
      res.end(JSON.stringify(msg)); 
      
    });
  });
  


module.exports = router;