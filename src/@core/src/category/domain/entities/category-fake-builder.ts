import { Category } from "./category";
import { Chance } from "chance";

type PropOrFactory<T> = T | ((index) => T);

class CategoryFakeBuilder<TBuild = any> {
    private name: PropOrFactory<string> = (_index) => this.chance.word();
    private description: PropOrFactory<string | null> = (_index) => this.chance.paragraph();
    private is_active: PropOrFactory<boolean> = (_index) => true;

    private countObjs;

    static aCategory() {
        return new CategoryFakeBuilder<Category>();
    }

    static theCategories() {
        return new CategoryFakeBuilder<Category[]>();
    }

    private chance: Chance.Chance;

    constructor(countObjs: number = 1){
        this.countObjs = countObjs;
        this.chance = Chance();
    }

    withName(name: PropOrFactory<string>){
        this.name = name;
        return this;
    }

    withDescription(description: PropOrFactory<string | null>){
        this.description = description;
        return this;
    }

    activate(){
        this.is_active = true;
        return this;
    }

    deactivate(){
        this.is_active = false;
        return this;
    }

    build() : TBuild {
        return new Category({
            name: typeof this.name === "function" ? this.name() : this.name,
            description: typeof this.description === "function" ? this.description(): this.description,
            is_active: typeof this.is_active === "function" ?  this.is_active() : this.is_active,
        });
    }
}