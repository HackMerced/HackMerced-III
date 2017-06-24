const utilities = require("../../api/tools/util.js");
const user = require("../../api/tools/user.js");


module.exports = function(assert, request, should){
  describe('Class User', function() {
    describe('#save()', function() {
      it('Saves a user', function() {
        installer.save(db, db.collection('users'), installer, function(){
          installer.find(db, db.collection('users'), user.email, function(user_ret){
            assert.equal(user_ret.email, user.email);
          }, function(err){
            assert.equal(true, false);
            throw err;
          });
        }, function(err){
          assert.equal(true, false);
          throw err;
        });
      });
    });
  });


});
