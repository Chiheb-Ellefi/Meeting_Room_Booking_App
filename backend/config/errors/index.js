const NotFound = require("./not_found");
const BadRequest = require("./bad_request");
const Unauthenticated = require("./unauthenticated");
const FailedDependency = require("./failed_dependency_error");
module.exports = { NotFound, BadRequest, Unauthenticated, FailedDependency };
