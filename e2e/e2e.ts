var test = {
  'basic injection' : function (client) {
    client
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 1000)
      .assert.visible('#basic_injection_ts_result_1')
      .assert.containsText("#basic_injection_ts_result_1", "A soldier tried to use primary weapon from a distance 5m of and was unsuccessful");
      .assert.visible('#basic_injection_ts_result_2')
      .assert.containsText("#basic_injection_ts_result_2", "A soldier tried to use primary weapon from a distance 5m of and was successful");
      .end();
  },
  'value injection' : function (client) {
    // TODO
  },
  'constructor injection' : function (client) {
    // TODO
  },
  'factory injection' : function (client) {
    // TODO
  },
  'promise injection' : function (client) {
    // TODO
  },
  'multi injection' : function (client) {
    // TODO
  },
  'named binding' : function (client) {
    // TODO
  },
  'tagged binding' : function (client) {
    // TODO
  },
  'contextual binding' : function (client) {
    // TODO
  }
};

export = test;
