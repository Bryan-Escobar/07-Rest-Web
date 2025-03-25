"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
class CreateTodoDto {
    constructor(text) {
        this.text = text;
    }
    static create(props) {
        const { text } = props;
        if (!text)
            return ['text is required', undefined];
        return [undefined, new CreateTodoDto(text)];
    }
}
exports.CreateTodoDto = CreateTodoDto;
//(props:{[key:string]:any})
//significa que el metodo puede recibir cualquier cantidad de parametros
//y estos deben ser de tipo (key) string y pueden tener cualquier valor (any)
