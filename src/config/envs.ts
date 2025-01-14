import 'dotenv/config';
import {get} from 'env-var';
export const envs=
{
    PORT:get('PORT').required().asPortNumber(), //port for the express server
    PUBLIC_PATH:get('PUBLIC_PATH').required().asString(), //path to the public folder
}