'use strict';
/*global casper*/

casper.test.begin('home page', 2, function suite (test) {

  casper.start('http://localhost:3000/', function () {
    test.assertHttpStatus(200);
  });

  casper.then(function () {
    test.assertSelectorHasText('a.nav-title','t m l b l');
  });

  casper.run(function () {
    test.done();
  });

});