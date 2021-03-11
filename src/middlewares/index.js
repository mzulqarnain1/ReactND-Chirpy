import logger from "./logger";
import thunk from "redux-thunk";
import {applyMiddleware} from "redux";

const middlewares = applyMiddleware(
    thunk,
    logger
)

export default middlewares