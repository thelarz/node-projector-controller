var NEC_POWER_OFF = new Buffer(6);

NEC_POWER_OFF[0] = 0x02;
NEC_POWER_OFF[1] = 0x01;
NEC_POWER_OFF[2] = 0x00;
NEC_POWER_OFF[3] = 0x00;
NEC_POWER_OFF[4] = 0x00;
NEC_POWER_OFF[5] = 0x03;

var net = require("net");

var client = net.connect(7142, "10.0.0.140");

client.on("connect", () => {
  console.log("connected");
  client.write(NEC_POWER_OFF, () => {
    console.log("written");
  });
});

client.on("data", (result) => {
  console.log(result.length);
})

