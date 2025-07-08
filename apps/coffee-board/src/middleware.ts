import { authUser } from "./middlewares/auth-user"
import { stackMiddleware } from "./middlewares/stack-middleware"

const middlewares = [authUser]

export default stackMiddleware(middlewares)
