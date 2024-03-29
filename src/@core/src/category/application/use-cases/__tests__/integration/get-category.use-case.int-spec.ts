import {GetCategoryUseCase} from "../../get-category.use-case";
import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

const { CategorySequelizeRepository, CategoryModel } = CategorySequelize;

describe("GetCategoryUseCase Integration Tests", () => {
  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  setupSequelize({models: [CategoryModel]});

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a category", async () => {
    const model = await CategoryModel.factory().create();
    const output = await useCase.execute({ id: model.id });
    expect(output).toStrictEqual({
      id: model.id,
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
    });
  });
});
