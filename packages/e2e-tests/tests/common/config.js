"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsConfig = void 0;
var e2e_1 = require("./config/e2e");
var development_1 = require("./config/development");
exports.testsConfig = {
    env: process.env.TEST_ENV,
    variables: fetchEnv(process.env.TEST_ENV),
};
function fetchEnv(env) {
    if (env === "e2e") {
        return e2e_1.e2eTestsConfig;
    }
    if (env === "development") {
        return development_1.developmentTestsConfig;
    }
    throw new Error("Wrong environment");
}
