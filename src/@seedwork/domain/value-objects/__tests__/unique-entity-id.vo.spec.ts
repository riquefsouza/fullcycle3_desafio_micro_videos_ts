import { validate as uuidValidate } from "uuid";
import InvalidUuidError from '../../../errors/invalid-uuid.error';
import UniqueEntityId from '../unique-entity-id.vo';

/*
function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
} //mock
*/

describe("UniqueEntityId Unit Tests", () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    /*
    beforeEach(() => {
        jest.clearAllMocks();
    });
    */

    it("should throw error when uuid is invalid", () => {
        //const validateSpy = spyValidateMethod();
        expect(() => new UniqueEntityId('fake id')).toThrow(InvalidUuidError);
        expect(validateSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor", () => {
        //const validateSpy = spyValidateMethod();
        const uuid = "00d7678b-02b6-4633-b829-ab0ec98f52c6";        
        const vo = new UniqueEntityId(uuid);
        expect(vo.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor", () => {
        //const validateSpy = spyValidateMethod();
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });

});