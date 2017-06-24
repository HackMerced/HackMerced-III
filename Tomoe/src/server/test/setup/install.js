// Test if database installs properly
const install = require("../../setup/install.js");
const user = require("../../api/tools/users.js").user;
const utilities = require("../../api/tools/util.js");
const Database = require('arangojs').Database;



module.exports = function(dotenv, assert, request, should, chai, options){
    let Database_Names = options.Database_Names;



    chai.should();
    chai.use(require('chai-things'));

    const db = new Database(process.env.DB_URI);

    describe('Database', function() {

      describe('#dropDatabase()', function() {
        it('Drops Databases', function(done) {

          // delete some pre-data
          db.dropDatabase(Database_Names.admin,
            function(){
              db.dropDatabase(Database_Names.hackathon,
                function(){
                  done();
                })
          });
        });
      });
    });





    // setup class
    let test_InstallerPackage = {
      email:utilities.createKey([5]).key + "@gmail.com",
      temp_password:utilities.createKey([4]).key,
      hackathon_name:utilities.createKey([2]).key,
    }

    let installer = new install.installerPackage(test_InstallerPackage.email);

    describe('Class InstallerPackage', function() {

      describe('#constructor()', function() {
        it('adds a email', function() {
          assert.equal(test_InstallerPackage.email, installer.returnInstaller().email);
        });
      });

      describe('#addHackathon()', function() {
        it('Adds a hackathon name', function() {
          installer.addHackathon(test_InstallerPackage.hackathon_name)
          assert.equal(test_InstallerPackage.hackathon_name, installer.returnInstaller().hackathon_name);

        });
      });


      describe('#addPassword()', function() {
        installer.setPassword(test_InstallerPackage.temp_password)
        let valid_password = utilities.validate.password(test_InstallerPackage.temp_password, installer.returnInstaller().password);

        it('Adds Password', function() {
          assert.isTrue(valid_password);
        });


        it('Deletes the temporary password', function() {
          assert.equal(installer.returnInstaller().temp_password, null);
        });
      });


      describe('#get()', function() {
        let user = installer.get();
            user._id = installer.assign();

        it('Returns a user', function() {
          should.exist(user._id);
          should.exist(user.email);
          should.exist(user.password);
      });




    });
  });

  // create test database
  describe('install.js', function() {
    describe('#installServerSoftware()', function() {
      it('creates a test admin and hackathon database', function(done) {
        install.installServerSoftware(installer, {
          admin: Database_Names.admin,
          hacks: Database_Names.hackathon,
          db: db
        }, function(){
          db.listDatabases(function(err, names) {
            assert.oneOf(Database_Names.admin, names);
            assert.oneOf(Database_Names.hackathon, names);
            done();
          });
        }, function(err){
          throw err;
          done();
        });
      });

      it('creates a test user', function(done) {
        db.useDatabase(Database_Names.admin);
        user.find(db, db.collection("users"), test_InstallerPackage.email, function(user){
          assert.equal(user.email, test_InstallerPackage.email);
          done();
        }, function(err){
          throw err;
          done();
        })
      });
    });

    describe('#hackathonInstaller()', function() {
      it('creates collections in databases', function(done) {
        install.installCollections(installer, {
          admin: Database_Names.admin,
          hacks: Database_Names.hackathon,
          db: db
        }, function(){
          db.useDatabase(Database_Names.admin);

          db.listCollections(function(err, names) {
            if(err){
              throw err;
            } else {

              names.should.contain.a.thing.with.property('name', 'users');

              db.useDatabase(Database_Names.hackathon);
              db.listCollections(function(err, names) {
                if(err){
                  throw err;
                } else {

                  names.should.contain.a.thing.with.property('name', 'hackers');
                  names.should.contain.a.thing.with.property('name', 'staff');
                  names.should.contain.a.thing.with.property('name', 'hackathons');
                  names.should.contain.a.thing.with.property('name', 'companies');

                  done();
                }
              })
            }

          });
        }, function(err){
          throw err;
          done();
        });
      });
    });

  });
};
