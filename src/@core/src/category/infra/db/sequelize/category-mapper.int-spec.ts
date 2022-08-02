import { Category } from "#category/domain";
import { LoadEntityError } from "#seedwork/domain";
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id.vo";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CategorySequelize } from "./category-sequelize";

const { CategoryModel, CategoryModelMapper } = CategorySequelize;

describe('CategoryModelMapper Unit tests', () => {
    setupSequelize({models: [CategoryModel]});

    it('should throws error when category is invalid', () => {
        const model = CategoryModel.build({
            id: '9366b7dc-2d71-4799-b91c-c64adb205104'
        });
        try {
            CategoryModelMapper.toEntity(model);
            fail('The category is valid, but it needs throws a LoadEntityError');
        } catch (e) {
            expect(e).toBeInstanceOf(LoadEntityError);
            expect(e.error).toMatchObject({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                  ],    
            });
        }
    });

    it('should throws a generic error', () => {
        const error = new Error("Generic Error");
        const spyValiate = jest
        .spyOn(Category, "validate")
        .mockImplementation(() => {
            throw error;
        });
        const model = CategoryModel.build({
            id: '9366b7dc-2d71-4799-b91c-c64adb205104'
        });
        expect(() => CategoryModelMapper.toEntity(model))
        .toThrow(error);
        expect(spyValiate).toHaveBeenCalled();
        spyValiate.mockRestore();
    });

    it('should convert a category model to a category entity', () => {
        const created_at = new Date();
        const model = CategoryModel.build({
            id: '9366b7dc-2d71-4799-b91c-c64adb205104',
            name: 'some value',
            description: 'some description',
            is_active: true,
            created_at,
        });
        const entity = CategoryModelMapper.toEntity(model);
        expect(entity.toJSON()).toStrictEqual(
            new Category({
                name: 'some value',
                description: 'some description',
                is_active: true,
                created_at,    
            },
            new UniqueEntityId('9366b7dc-2d71-4799-b91c-c64adb205104')
            ).toJSON()
        );
    });
});