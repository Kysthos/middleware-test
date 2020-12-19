"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareManager = void 0;
class MiddlewareManager {
    constructor() {
        this.chain = [];
    }
    use(middleware) {
        this.chain.push(middleware);
    }
    dispatch(...args) {
        if (this.chain.length === 0)
            return;
        let index = 0;
        const done = () => {
            index++;
            if (this.chain[index])
                this.chain[index](...args, done);
        };
        this.chain[index](...args, done);
    }
}
exports.MiddlewareManager = MiddlewareManager;
