var expect = require('chai').expect;
var webdriverio = require('webdriverio');

describe('Visiting the homepage', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'}});
    client.init(done);
  });

  after(function(done) {
    client.end(done);
  });

  beforeEach(function(done) {
    client
      .url('http://localhost:3000')
      .call(done);
  });

  it('has a title', function(done) {
    client
      .getTitle(function(err, title) {
        expect(err).to.not.be.true;
        expect(title).to.eql('Sudoku Solver');
      })
      .call(done);
  });

  it('loads a puzzle into the table', function(done) {
    client
      .setValue('#sudokustring', '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79')
      .click('#preview')
      .waitForValue('/html/body/center/table/tbody/tr[1]/td[1]/input', 1000)
      .getValue('/html/body/center/table/tbody/tr[1]/td[1]/input', function(err, value) {
        expect(value).to.eql("5");
      })
      .call(done);
  });

});

