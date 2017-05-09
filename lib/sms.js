/* LIB */

var sendRequest = require('./sendRequest');


/* Constructor */
(function() {
  var Sms = {};

  var params;

  Sms.setup = function(setupParams) {
    params = setupParams;
    params.baseUrl = 'https://rest-api.telesign.com/v' + params.version;
    sendRequest.setup(setupParams);
  };


  Sms.get = function(options){
    if (!options || typeof options !== 'object') {
      throw new Error('Error calling SMS Get - no params object provided.');
    } else if (!callback || typeof callback !== 'function') {
      throw new Error('Error calling SMS Get - no callback function provided.');
    } else if (!options.referenceId) {
      return callback('Error calling SMS Get - "referenceId" not provided in the request params.');
    }

    sendRequest.request({
      method: 'GET',
      resource: '/messaging/' + options.referenceId,
      qs: options.qs || null
    }, function (err, data) {
      return callback(err, data);
    });

  }

  Sms.send = function(options, callback) {
    if (!options || typeof options !== 'object') {
      throw new Error('Error calling Verify SMS - no params object provided.');
    } else if (!callback || typeof callback !== 'function') {
      throw new Error('Error calling Verify SMS - no callback function provided.');
    } else if (!options.phoneNumber) {
      return callback('Error calling SMS send - "phoneNumber" not provided in the request params.');
    } else if (!options.messageType) {
      return callback('Error calling SMS send - "messageType" not provided in the request params.');
    } else if (!options.message) {
      return callback('Error calling SMS send - "message" not provided in the request params.');
    }

    var fields = {
      phone_number: options.phoneNumber,
      message_type: options.messageType,
      message: options.message,
      callback_url: options.callback_url,
      account_lifecycle_event: options.account_licecycle_event,
      sender_id: options.sender_id,
      originating_ip: options.originating_ip
    };

    sendRequest.request({
      method: 'POST',
      resource: '/messaging',
      qs: options.qs || null,
      fields: fields
    }, function(err, data) {
      return callback(err, data);
    });
  }

  /* NPM Export */
  if (typeof module == 'object' && module.exports) {
    module.exports = Sms;
  } else {
    throw new Error('This module only works with NPM in NodeJS/IO.JS environments');
  }
}());