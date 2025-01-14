"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(), //port for the express server
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').required().asString(), //path to the public folder
};
