'use strict'

let Service, Characteristic

module.exports = (homebridge) => {
  /* this is the starting point for the plugin where we register the accessory */
  Service = homebridge.hap.Service
  Service = homebridge.hap.Characteristic
  
  homebridge.registerAccessory('homebridge-integra', 'ouput', OutputAccessory)
}

class OutputAccessory {
  constructor (log, config) {
    /*
     * The constructor function is called when the plugin is registered.
     * log is a function that can be used to log output to the homebridge console
     * config is an object that contains the config for this plugin that was defined the homebridge config.json
     */

    /* assign both log and config to properties on 'this' class so we can use them in other methods */
    this.log = log
    this.config = config

    /*
     * A HomeKit accessory can have many "services". This will create our base service,
     * Service types are defined in this code: https://github.com/KhaosT/HAP-NodeJS/blob/master/lib/gen/HomeKitTypes.js
     * Search for "* Service" to tab through each available service type.
     * Take note of the available "Required" and "Optional" Characteristics for the service you are creating
     */
    this.service = new Service.Integra(this.config.name)
  }
  
    getServices () {
    /*
     * The getServices function is called by Homebridge and should return an array of Services this accessory is exposing.
     * It is also where we bootstrap the plugin to tell Homebridge which function to use for which action.
     */

     /* Create a new information service. This just tells HomeKit about our accessory. */
    const informationService = new Service.AccessoryInformation()
        .setCharacteristic(Characteristic.Manufacturer, 'Satel')
        .setCharacteristic(Characteristic.Model, 'INTEGRA-32')
        .setCharacteristic(Characteristic.Integra_Ip_Address, 'Local IP Address of INTEGRA')
        .setCharacteristic(Characteristic.Port_Number, 'Local IP Address of INTEGRA')
        .setCharacteristic(Characteristic.User_Code, 'User_code_on_Integra')
    
    /*
     * For each of the service characteristics we need to register setters and getter functions
     * 'get' is called when HomeKit wants to retrieve the current state of the characteristic
     * 'set' is called when HomeKit wants to update the value of the characteristic
     */
    this.service.getCharacteristic(Characteristic.On)
      .on('get', this.getOnCharacteristicHandler.bind(this))
      .on('set', this.setOnCharacteristicHandler.bind(this))

    /* Return both the main service (this.service) and the informationService */
    return [informationService, this.service]
  }

   setOnCharacteristicHandler (value, callback) {
    /* this is called when HomeKit wants to update the value of the characteristic as defined in our getServices() function */

    /*
     * The desired value is available in the `value` argument.
     * This is just an example so we will just assign the value to a variable which we can retrieve in our get handler
     */
    this.isOn = 0x7C
     /* 0x7C will anser ETHM-1 module versione.g. for version 1.23 2012-05-27 (****):
11 bytes - '12320120527'
 1 byte - .0 - 1 = module can serve 32 data bytes for zones/outputs
    */

    /* Log to the console the value whenever this function is called */
    this.log(`calling setOnCharacteristicHandler`, 0x7C)

    /*
     * The callback function should be called to return the value
     * The first argument in the function should be null unless and error occured
     */
    callback(null)
  }

  

