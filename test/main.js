var api = require('../');
var should = require('should');
require('mocha');
require('fixnode');

describe('4chan api', function() {

  describe('boards()', function() {
    it('should return a list of boards', function(done) {
      this.timeout(5000);
      api.boards(function(err, boards){
        should.not.exist(err);
        should.exist(boards);
        Array.isArray(boards).should.equal(true);
        boards.length.should.not.equal(0);
        done();
      });
    });
  });

  describe('board()', function() {
    it('should return a board object', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      should.exist(board);
      done();
    });
  });

  describe('board.catalog()', function() {
    it('should return a list of pages from /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.catalog(function(err, pages){
        should.not.exist(err);
        should.exist(pages);
        Array.isArray(pages).should.equal(true);
        pages.length.should.not.equal(0);
        should.exist(pages[0].page);
        pages[0].page.should.equal(0);
        done();
      });
    });
  });

  describe('board.page()', function() {
    it('should return a list of threads from page 0 of /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.page(0, function(err, threads){
        should.not.exist(err);
        should.exist(threads);
        Array.isArray(threads).should.equal(true);
        threads.length.should.not.equal(0);
        should.exist(threads[0].posts);
        done();
      });
    });
  });

  describe('board.threads()', function() {
    it('should return a list of threads from page 0 of /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.threads(function(err, pages){
        should.not.exist(err);
        should.exist(pages);
        Array.isArray(pages).should.equal(true);
        pages.length.should.not.equal(0);
        should.exist(pages[0].threads);
        done();
      });
    });
  });

  describe('board.thread()', function() {
    it('should return a full threads from /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.threads(function(err, pages){
        board.thread(pages[0].threads[0].no, function(err, thread){
          should.not.exist(err);
          should.exist(thread);
          Array.isArray(thread).should.equal(true);
          thread.length.should.not.equal(0);
          done();
        })
      });
    });
  });

  describe('board.image()', function () {
    this.timeout(5000);
    var board = api.board('b');
    it('should return a string of the image', function(done) {
      var image1 = board.image(1387116137513, '.jpg');
      should.exist(image1);
      image1.should.equal('http://i.4cdn.org/b/src/1387116137513.jpg');
      var image2 = board.image('1387116137513', '.jpg');
      should.exist(image2);
      image2.should.equal('http://i.4cdn.org/b/src/1387116137513.jpg');
      done();
    });
    it('should handle NaN\'s and nulls', function(done) {
      var image3 = board.image(NaN, '.jpg');
      should.strictEqual(null, image3);
      var image4 = board.image(null, '.jpg');
      should.strictEqual(null, image4);
      var image5 = board.image(null, null);
      should.strictEqual(null, image5);
      var image6 = board.image(1387116137513, null);
      should.strictEqual(null, image6);
      var image7 = board.image('1387116137513', null);
      should.strictEqual(null, image6);
      done();
    });
  });

  describe('board.imageCache()', function () {
    this.timeout(5000);
    var board = api.board('b');
    it('should return a string of the image', function(done) {
      var image1 = board.imageCache(1387116137513, '.jpg');
      should.exist(image1);
      image1.should.equal('http://i.4chanlink.org/b/src/1387116137513.jpg');
      var image2 = board.imageCache('1387116137513', '.jpg');
      should.exist(image2);
      image2.should.equal('http://i.4chanlink.org/b/src/1387116137513.jpg');
      done();
    });
    it('should handle NaN\'s and nulls', function(done) {
      var image3 = board.imageCache(NaN, '.jpg');
      should.strictEqual(null, image3);
      var image4 = board.imageCache(null, '.jpg');
      should.strictEqual(null, image4);
      var image5 = board.imageCache(null, null);
      should.strictEqual(null, image5);
      var image6 = board.imageCache(1387116137513, null);
      should.strictEqual(null, image6);
      var image7 = board.imageCache('1387116137513', null);
      should.strictEqual(null, image6);
      done();
    });
  });
});
