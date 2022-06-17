import { Model, PrimaryKey, Column, DataType, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize-model-factory";
import { validate as uuidValidate } from 'uuid';
import _chance from 'chance';
import { setupSequelize } from "../testing/helpers/db";

const chance = _chance();

@Table({})
class StubModel extends Model {

    @PrimaryKey
    @Column({type: DataType.UUID})
    declare id;

    @Column({allowNull: false, type: DataType.STRING(255)})
    declare name;

    static mockFactory = jest.fn(() => ({
        id: chance.guid({version: 4}),
        name: chance.word(),
    }));

    static factory() {
        return new SequelizeModelFactory(StubModel, StubModel.mockFactory);
    }
}

describe('SequelizeModelFactory Unit Tests', () => {
    setupSequelize({models: [StubModel]});

    test('create method', async () => {
        let model = await StubModel.factory().create();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();

        let modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);

        model = await StubModel.factory().create({
            id: '9366b7dc-2d71-4799-b91c-c64adb205104',
            name: 'test',
        });
        expect(model.id).toBe('9366b7dc-2d71-4799-b91c-c64adb205104');
        expect(model.name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

        modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);
    });

});