var express = require('express');
var kafka = require('kafka-node');
var router = express.Router();




var Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
	producer = new Producer(client);
	

	producer.on('ready', function () {
		console.log('Producer is ready');
	});
	
	producer.on('error', function (err) {
		console.log('Producer is in error state');
		console.log(err);
	})

	
    

	router.post('/sendMsg',function(req,res){
		var sentMessage = JSON.stringify(req.body.message);
		payloads = [
			{ topic: "test", messages:sentMessage , partition: 0 }
		];
		producer.send(payloads, function (err, data) {
				res.json(data);
		});
		
    })
    
    


    module.exports = router;