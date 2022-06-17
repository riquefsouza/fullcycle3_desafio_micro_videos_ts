import { Category } from "#category/domain";
import NotFoundError from "#seedwork/domain/errors/not-found.error";
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id.vo";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CategoryModel } from "./category-model";
import { CategorySequelizeRepository } from "./category-repository";

describe("CategorySequelizeRepository Unit Tests", () => {
    setupSequelize({models: [CategoryModel]});
    let repository: CategorySequelizeRepository;

    beforeEach(async () => {
        repository = new CategorySequelizeRepository(CategoryModel);
    });

    it('should inserts a new entity', async () => {
        let category = new Category({name: "Movie"});
        await repository.insert(category);
        let model = await CategoryModel.findByPk(category.id);
        expect(model.toJSON()).toStrictEqual(category.toJSON());

        category = new Category({
            name: "Movie",
            description: "some description",
            is_active: false,
        });
        await repository.insert(category);
        model = await CategoryModel.findByPk(category.id);
        expect(model.toJSON()).toStrictEqual(category.toJSON());
    });

    it('should throws error when entity not found', async () => {
        await expect(repository.findById("fake id")).rejects.toThrow(
            new NotFoundError("Entity Not found using ID fake id")
        );

        await expect(
            repository.findById(
                new UniqueEntityId('9366b7dc-2d71-4799-b91c-c64adb205104')
            )
        ).rejects.toThrow(
            new NotFoundError(
                "Entity Not found using ID 9366b7dc-2d71-4799-b91c-c64adb205104"
            )
        );
    });

    it("should finds a entity by id", async () => {
        const entity = new Category({ name: "Movie" });
        await repository.insert(entity);
    
        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    
        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it("should return all categories", async () => {
        const entity = new Category({ name: "Movie" });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities).toHaveLength(1);
        expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
    });

    it("search", async () => {
        await CategoryModel.factory().create();
        await CategoryModel.findAll();
    });
});