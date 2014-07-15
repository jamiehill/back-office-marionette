define(['app'], function(App){

    describe("- app.spec.js\n", function() {

        // Setup/teardown ------------------------------------------


        beforeEach(function(){
            spyOn(App.core, 'trigger');
            App.start();
        });

        afterEach(function(){

        });


        // Specs ----------------------------------------------------


        describe("initialization", function() {
            it("should initialise Application", function() {
                expect(App).toBeDefined();
            });

            xit("should initialise Marionette.Application", function() {
                expect(App.core).toBeDefined();
            });
        });


        describe("during startup", function() {
            it("should trigger initialize:before", function() {
                expect(App.core.trigger).toHaveBeenCalledWith('initialize:before', undefined );
            });
            it("should trigger initialize:after", function() {
                expect(App.core.trigger).toHaveBeenCalledWith('initialize:after', undefined);
            });
            it("should trigger app:start", function() {
                expect(App.core.trigger).toHaveBeenCalledWith('start', undefined);
            });
        });


        xdescribe("when initialized", function() {
            it("should show bootStart time", function() {
                expect(App.core.bootStart).toBeDefined();
            });

            it("should show bootFinish time", function() {
                expect(App.core.bootFinish).toBeDefined();
            });

            it("should show bootDuration", function() {
                expect(App.core.bootDuration).toBeDefined();
            });
        });


    });

});

