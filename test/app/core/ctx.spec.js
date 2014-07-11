define(['ctx', 'app'], function(ctx, App){

    describe("ctx.spec.js", function() {

        var managedString = function(id, value){
            var managed = ctx.get(id);
            managed.should.equal(value);
            console.log(id+" = "+managed);
        };

        App.start();


        // Setup/teardown ------------------------------------------
        // Specs ----------------------------------------------------


        describe("initialization", function() {
            it("should have ctx", function() {
                expect(ctx).toBeDefined();
            });
        });


        describe("registered", function() {
            it("should manage 'appname'", function() {
                managedString('appname', 'Ats Back Office');
            });
            it("should manage 'appid'", function() {
                managedString('appid', 'web-sb-backoffice');
            });
            it("should manage 'endpoint'", function() {
                managedString('endpoint', 'http://sportsbook-dev.amelco.co.uk/sb-backoffice/v1/api/');
            });
        });

    });

});

