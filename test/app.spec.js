define(['app'], function(App){

    xdescribe("app.spec.js", function() {


        // Setup/teardown ------------------------------------------


        beforeEach(function(){

        });

        afterEach(function(){

        });


        // Specs ----------------------------------------------------


        describe("initialization", function() {
            it("should initialise Application", function() {
                expect(App).toBeDefined();
            });

            it("should initialise Marionette.Application", function() {
                expect(App.core).toBeDefined();
            });
        });


        describe("during startup", function() {
            it("should dispatch appropriate events", function() {
                App.start();
//                eventSpyHandler('initialize:before', {name:'jamie'});
//                eventSpyHandler('initialize:after', {age:30});
            });

        });

        var eventSpyHandler = function(event, opts){
            var spy = sinon.spy();
            App.core.on(event, spy);
//            spy.should.have.been.called();
            spy.should.have.been.called.with(opts);
        }


        describe("when initialized", function() {
            it("should show bootStart time", function() {
                expect(App.core.bootStart).toBeDefined();
            });

            it("should show bootFinish time", function() {
                expect(App.core.bootFinish).toBe('Ats Back Office');
            });

            it("should show bootDuration", function() {
                expect(App.core.bootDuration).toBe('Ats Back Office');
            });
        });


    });

});

