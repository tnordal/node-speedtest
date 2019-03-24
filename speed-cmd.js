const fs = require('fs');
const path = require('path');
const speedTest = require('speedtest-net');

test_data = {
  speeds: {
    download: 19.655,
    upload: 20.333,
    originalDownload: 2164641,
    originalUpload: 2231406
  },
  client: {
    ip: '78.26.39.38',
    lat: 67.7496,
    lon: 15.0142,
    isp: 'Trollfjord Bredband AS',
    isprating: 3.7,
    rating: 0,
    ispdlavg: 0,
    ispulavg: 0,
    country: 'NO'
  },
  server: {
    host: 'speedo.eltele.no',
    lat: 69.9403,
    lon: 23.3106,
    location: 'Alta',
    country: 'Norway',
    cc: 'NO',
    sponsor: 'Eltele AS',
    distance: 411.98,
    distanceMi: 255.99,
    ping: 48.9,
    id: '3433'
  }
}

const write_to_file = (data) => {
  const logfile = path.join(__dirname, 'speedlog.csv');
  const now = new Date().toISOString();
  const dataString = [now, data.speeds.download, data.speeds.upload].join(',') + '\n';

  if (!fs.existsSync(logfile)) {
    const headings = ['TimeStamp', 'Download', 'Upload'].join(',') + '\n';
    fs.writeFileSync(logfile, headings)
  };

  fs.appendFile(logfile, dataString, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  })
};

const dataLogging = (data) => {

  write_to_file(data);

};


// dataLogging(test_data);


const speed_test = () => {
  const options = {
    maxTime: 5000,
    maxServers: 5
  }
  console.log('Running test');
  const st = speedTest(options);

  st.on('data', data => {
    dataLogging(data);
  });

  st.on('error', err => {
    console.error(err);
  });

}

speed_test();