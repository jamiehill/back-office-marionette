define(['marionette', 'app/model/SessionModel'], function(Marionette, SessionModel){

    describe("- SessionModel.spec.js\n", function() {
        var model, app;
        var creds = {
            accountId: '123',
            username: 'jamie',
            password: 'password1',
            sessionToken: 'abcdefghijklmnop',
            accountBalance: {
                value: '999999',
                currency: '£'
            }
        };

        var logIn = function(){
            model.storeSession(creds);
        };


        // Setup/teardown ------------------------------------------


        beforeEach(function(){
            app = new Marionette.Application();
            model = new SessionModel();
            model.vent = app.vent;
            model.clearSession();

            spyOn(model.vent, 'trigger');
        });

        afterEach(function(){

        });


        // Specs ----------------------------------------------------


        describe("state:logged out", function() {
            it("should be logged out", function() {
                expect(model.isLoggedIn()).toBeFalsy();
                expect(model.isNotLoggedIn()).toBeTruthy();
            });
            it("should have default values", function() {
                expect(model.getBalance()).toEqual('0');
                expect(model.getUsername()).toEqual('-');
                expect(model.getSessionToken()).toEqual('-');
                expect(model.getAccountId()).toEqual('-');
            });
            it("should trigger 'session:loggedout' on logout", function() {
                model.clearSession();
                expect(model.vent.trigger).toHaveBeenCalledWith('session:loggedout');
            });
        });


        describe("state:logged in", function() {
            it("should be logged in", function() {
                logIn();
                expect(model.isLoggedIn()).toBeTruthy();
                expect(model.isNotLoggedIn()).toBeFalsy();
            });
            it("should persist credentials", function() {
                logIn();
                expect(model.getBalance()).toEqual('999999');
                expect(model.getUsername()).toEqual('jamie');
                expect(model.getSessionToken()).toEqual('abcdefghijklmnop');
                expect(model.getAccountId()).toEqual('123');
            });
            it("should trigger 'session:loggedin' on login", function() {
                logIn();
                expect(model.vent.trigger).toHaveBeenCalledWith('session:loggedin', creds);
            });
        });


        describe("sessionStorage", function() {
            it("should be defined", function() {
                expect(sessionStorage).toBeDefined();
            });
            it("should be null when state = logged out", function() {
                expect(model.store.get("session")).toBeNull();
            });
            it("should be defined when state = logged in", function() {
                logIn();
                expect(model.get('accountId')).toEqual('123');
                expect(model.get('username')).toEqual('jamie');
                expect(model.get('password')).toEqual('password1');
                expect(model.get('sessionToken')).toEqual('abcdefghijklmnop');

                var accountBalance = model.get('accountBalance');
                expect(accountBalance).not.toBeNull();
                expect(accountBalance.value).toEqual('999999');
                expect(accountBalance.currency).toEqual('£');
            });
        });

    });
});

