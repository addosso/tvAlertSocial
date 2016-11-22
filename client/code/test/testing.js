/**
 * Created by fortunato on 14/11/16.
 */

describe("Frist test", function(){

    beforeEach(function(){
    });

    it('Get xhr', function(done){

        expect(PROVA != null).toBe(true);
        PROVA.init();
        setTimeout(function(){
            expect(PROVA.getSettings().ciao).toBe("io sono");
            done();
        },4000);




    })



});