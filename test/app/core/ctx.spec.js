define(['ctx', 'app'], function(ctx, App){

    describe("- ctx.spec.js\n", function() {
        var registered = function(id, value){
            ctx.get(id).should.equal(value);
        };

        App.start();


        // Setup/teardown ------------------------------------------
        // Specs ----------------------------------------------------


        describe("initialization", function() {
            it("should have ctx", function() {
                expect(ctx).toBeDefined();
            });
        });


        describe("context", function() {
            it("should have 'appname' registered", function() {
                registered('appname', 'Ats Back Office');
            });
            it("should have 'appid' registered", function() {
                registered('appid', 'web-sb-backoffice');
            });
            it("should have 'endpoint' registered", function() {
                registered('endpoint', 'http://sportsbook-dev.amelco.co.uk/sb-backoffice/v1/api/');
            });
        });

    });

});

