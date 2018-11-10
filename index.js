'use strict';

var Service,
    Charasteristic,
    Integra_ip,
    Integra_port,
    Integra_user;
    
module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerPlatform("homebridge-integra", "Integra", Integra);
  
  
