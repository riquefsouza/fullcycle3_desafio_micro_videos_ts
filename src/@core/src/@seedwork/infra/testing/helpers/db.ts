import { configTest as config } from "#seedwork/infra/config";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeOptions: SequelizeOptions = {
    dialect: config.db.vendor,
    host: config.db.host,
    logging: config.db.logging,
};

export function setupSequelize(options: SequelizeOptions = {}) {
    let _sequelize: Sequelize;

    beforeAll(() =>
        (_sequelize = new Sequelize({
            ...sequelizeOptions,
            ...options,
        }))
    );
    
    beforeEach(async () => {
        //force = true para apagar as tabelas antes
        await _sequelize.sync({force: true});
    });

    afterAll(async () => {
        await _sequelize.close();
    });

    return { 
        get sequelize () {
            return _sequelize;
        },
    };
}