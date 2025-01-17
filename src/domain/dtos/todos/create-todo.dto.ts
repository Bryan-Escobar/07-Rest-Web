export class CreateTodoDto {
    private constructor (public readonly text:string,)
    {

    }
    static create(props:{[key:string]:any}):[string?,CreateTodoDto?]
    {
        const {text} = props;
        if(!text) return ['text is required',undefined];
        
        return [undefined,new CreateTodoDto(text)];
    }
}

//(props:{[key:string]:any})
//significa que el metodo puede recibir cualquier cantidad de parametros
//y estos deben ser de tipo (key) string y pueden tener cualquier valor (any)
