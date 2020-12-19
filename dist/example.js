"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const manager = new _1.MiddlewareManager();
// trim white spaces
manager.use((req, res, done) => {
    req.input = req.input.trim();
    done();
});
// make uppercase
manager.use((req, res, done) => {
    req.input = req.input.toUpperCase();
    done();
});
// censure
manager.use((req, res, done) => {
    const prohibitedWords = ["CARROT", "MUSTARD"];
    for (const word of prohibitedWords) {
        const replacement = "*".repeat(word.length);
        const regex = new RegExp(word, "g");
        req.input = req.input.replace(regex, replacement);
    }
    done();
});
// send the answer
manager.use((req, res, done) => {
    res.send(req.input);
});
const req = {
    input: "    I want a caRRot with some mUstaRd PLEAse      ",
};
const res = {
    send(answer) {
        console.log(answer);
    },
};
manager.dispatch(req, res);
