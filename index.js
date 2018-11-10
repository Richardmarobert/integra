'use strict';

var Service,
    Charasteristic,
    UUIDGen;

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	UUIDGen = homebridge.hap.uuid;

	homebridge.registerPlatform("homebridge-integra", "Integra", Integra);
  
}

Integra.prototype = {
	getServices: function () {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Satel")
      .setCharacteristic(Characteristic.Model, "Integra 32")
      .setCharacteristic(Characteristic.Usercode, "1102");
		
 
}
