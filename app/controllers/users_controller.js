import User from '#models/user';
import { createPostUser } from '#validators/user';
export default class UsersController {
    async store({ request }) {
        console.log(request.response);
        const payload = await request.validateUsing(createPostUser);
        return User.create(payload);
    }
}
//# sourceMappingURL=users_controller.js.map