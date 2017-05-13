
var SerialPort = require('serialport');


// Some sample projector control codes
var NEC = {
    baudRate: 9600,
    on: [0x02, 0x00, 0x00, 0x00, 0x00, 0x02],
    off: [0x02, 0x01, 0x00, 0x00, 0x00, 0x03]
}

var VIEWSONIC = {
    baudRate: 115200,
    on: [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x00, 0x00, 0x5D],
    off: [0x06, 0x14, 0x00, 0x04, 0x00, 0x34, 0x11, 0x01, 0x00, 0x5E]
}

var available = [];
var comPort = "COM7";
var device = NEC;
var command = device.off;

// Check for attached serial ports, not need here but useful
SerialPort.list((err, ports) => {
    ports.forEach((port) => {
        console.log(port.comName);
        available.push(port.comName);
    });
});

// Set for auto-open already
var port = new SerialPort(comPort, {
    baudRate: device.baudRate,
    dataBits: 8,
    parity: "none",
    stopBits: 1
});

port.on('open', function() {
    console.log("Port opened");
    port.write(command, function (data) {
        console.log("Command Sent");
        port.close();
    });
});
port.on('error', function(err) {
    console.log('Error:', err.message);
});
port.on('close', function(err) {
    console.log("Port closed");
});
port.on('data', function(data) {
    console.log(data.toString("hex"));
})


