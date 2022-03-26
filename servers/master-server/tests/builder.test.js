const ResponseBuilder = require("../utils/response");

describe('Response Builder Tests', () => {
    test('Can Build Response', ()=>{
        expect.assertions(4);

        let testStatus = 200;
        let testMessage = "success";
        let testBody = {
            testData: {}
        };

        const res = new ResponseBuilder().setStatus(testStatus).setMessage(testMessage).setBody(testBody).build();
        console.log(res);

        expect(res.status).toBe(testStatus);
        expect(res.message).toBe(testMessage);
        expect(res).toHaveProperty("testData");
        expect(res.date).toBeInstanceOf(Date);

    });
});