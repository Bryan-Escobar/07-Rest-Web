"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.completedAt)
            returnObj.completedAt = this.completedAt;
        return returnObj;
    }
    static create(props) {
        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;
        if (!id || isNaN(id))
            return ['id is required', undefined];
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if ((newCompletedAt.toString() === 'Invalid Date') || !(newCompletedAt instanceof Date)) {
                return ['completedAt is not a valid date', undefined];
            }
        }
        return [undefined, new UpdateTodoDto(id, text, completedAt)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
