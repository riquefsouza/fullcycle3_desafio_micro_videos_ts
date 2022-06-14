import { CategoryRepository } from "../../domain/repository/category.repository";
import UseCase from "../../../@seedwork/application/use-case";

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
        await this.categoryRepository.delete(input.id);
    }
}

export type Input = {
    id: string;
};

type Output = void;



