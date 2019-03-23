var speedTest = require('speedtest-net');
 
speedTest.visual({maxTime: 5000, log:true}, (err, data) => {
  // console.dir(data);
  console.log(data.speeds.download)
});