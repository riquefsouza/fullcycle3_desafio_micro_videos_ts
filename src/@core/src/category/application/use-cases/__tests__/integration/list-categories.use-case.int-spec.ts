import {ListCategoriesUseCase} from "../../list-categories.use-case";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import _chance from 'chance';
import { CategoryFakeBuilder } from "#category/domain/entities/category-fake-builder";

const { CategorySequelizeRepository, CategoryModel } = CategorySequelize;

describe("ListCategoriesUseCase Integration Tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  setupSequelize({models: [CategoryModel]});

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  it("should return output using empty input with categories ordered by created_at", async () => {
    const faker = CategoryFakeBuilder.theCategories(2);

    const models = faker
      .withName((index) => `category ${index}`)
      .withCreatedAt((index) => new Date(new Date().getTime() + index))
      .build();

    await repository.bulkInsert(models);

    /*
    const models = await CategoryModel.factory()
      .count(2)
      .bulkCreate((index: number) => {
        const chance = _chance();
        return {
          id: chance.guid({version: 4}),
          name: `category ${index}`,
          description: 'some description',
          is_active: true,
          created_at: new Date(new Date().getTime() + index),
        }
    });
    */

    const output = await useCase.execute({});
    expect(output).toMatchObject({
      items: [...models].reverse()
      //.map(CategorySequelize.CategoryModelMapper.toEntity)
      .map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const faker = CategoryFakeBuilder.aCategory();
    const models = [
      faker.withName('a').build(),
      faker.withName('AAA').build(),
      faker.withName('AaA').build(),
      faker.withName('b').build(),
      faker.withName('c').build(),
    ];
    await repository.bulkInsert(models);
    /*
    const models = await CategoryModel.factory().count(5).bulkMake();
    models[0].name = 'a';
    models[1].name = 'AAA';
    models[2].name = 'AaA';
    models[3].name = 'b';
    models[4].name = 'c';
    CategoryModel.bulkCreate(models.map(m => m.toJSON()));
    */
    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toMatchObject({
      items: [models[1], models[2]]
      //.map(CategorySequelize.CategoryModelMapper.toEntity)
      .map((i) => i.toJSON()),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toMatchObject({
      items: [models[0]]
      //.map(CategorySequelize.CategoryModelMapper.toEntity)
      .map((i) => i.toJSON()),
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: 'desc',
      filter: "a",
    });
    expect(output).toMatchObject({
      items: [models[0], models[2]]
      //.map(CategorySequelize.CategoryModelMapper.toEntity)
      .map((i) => i.toJSON()),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
