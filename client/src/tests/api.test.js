import auth from "../store/services/auth";
import storage from "../storage";

describe("API Tests", ()=>{
    beforeEach(() => {
        
        storage.clear();

        jest.clearAllMocks();
        
        localStorage.setItem.mockClear();
    });
    
    describe('Passing Test', ()=>{
        it("Will Always Pass",()=>{
            expect(1+1).toBe(2);
        });
    });
    
    describe("#getAuthStatus()", () => {
        it("Should Get User From Localstorage and Return Authentication Status", async() => {
            expect.assertions(2);
            const storedUser = storage.get("USER");
            const authStatus = await auth.getAuthStatus();
            expect(authStatus).toBeDefined();
            if(storedUser === null || storedUser === undefined){
                expect(authStatus.authenticated).toBe(false);
            }else{
                expect(authStatus.authenticated).toBe(true);
            }
        });
    });
    
    test.todo("#getUserCount()")
    
});