import { CreateCategoryUseCase, DeleteCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase, UpdateCategoryUseCase } from "@fc/micro-videos/category/application";
import CategoryRepository from "@fc/micro-videos/dist/category/domain/repository/category.repository";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "src/categories/categories.controller";
import { CategoriesModule } from "src/categories/categories.module";
import { CATEGORY_PROVIDERS } from "../../category.providers";
import { DatabaseModule } from "src/database/database.module";

describe('CategoriesController Integration testes', () => {
    let controller: CategoriesController;
    let repository: CategoryRepository.Repository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
        }).compile();

        controller = module.get<CategoriesController>(CategoriesController);
        repository = module.get(
            CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide);
    });

    it ('should be defined', () => {
        expect(controller).toBeDefined();
        expect(controller['createUseCase']).toBeInstanceOf(
            CreateCategoryUseCase.UseCase,
        );
        expect(controller['updateUseCase']).toBeInstanceOf(
            UpdateCategoryUseCase.UseCase,
        );
        expect(controller['listUseCase']).toBeInstanceOf(
            ListCategoriesUseCase.UseCase,
        );
        expect(controller['getUseCase']).toBeInstanceOf(
            GetCategoryUseCase.UseCase,
        );
        expect(controller['deleteUseCase']).toBeInstanceOf(
            DeleteCategoryUseCase.UseCase,
        );
    });

    it ('should create a category', async () => {
        const arrange = [
            {
                request: {
                    name: 'Movie',
                },
                expectedPresenter: {
                    name: 'Movie',
                    description: null,
                    is_active: true,
                },
            },
            {
                request: {
                    name: 'Movie',
                    description: null,
                    is_active: false,
                },
                expectedPresenter: {
                    name: 'Movie',
                    description: null,
                    is_active: true,
                },
            },
            {
                request: {
                    name: 'Movie',
                    is_active: true,
                },
                expectedPresenter: {
                    name: 'Movie',
                    description: null,
                    is_active: true,
                },
            },                      
        ];

        test.each(arrange)(
            'with request $request',
            async ({ request, expectedPresenter }) => {
                const presenter = await controller.create(request);
                const entity = await repository.findById(presenter.id);

                expect(entity).toMatchObject({
                    id: presenter.id,
                    name: expectedPresenter.name,
                    description: expectedPresenter.description,
                    is_active: expectedPresenter.is_active,
                    created_at: presenter.created_at,
                });
        
                expect(presenter.id).toBe(entity.id);
                expect(presenter.name).toBe(expectedPresenter.name);
                expect(presenter.description).toBe(expectedPresenter.description);
                expect(presenter.is_active).toBe(expectedPresenter.is_active);
                expect(presenter.created_at).toStrictEqual(entity.created_at);
            },
        );

    });
});