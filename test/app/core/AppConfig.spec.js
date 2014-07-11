define(['app/core/AppConfig'], function(ctx, AppConfig){

    xdescribe("AppConfig.spec.js", function() {


        // Setup/teardown ------------------------------------------


        beforeEach(function(){

        });

        afterEach(function(){

        });


        // Specs ----------------------------------------------------


        describe("initialization", function() {
            it("should have ctx", function() {
                expect(AppConfig.ctx).toBeDefined();
            });
        });


    });

});

