import User from '#models/user';
import { createPostUser } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    async store({ request }: HttpContext) {
        console.log(request.response)
        const payload = await request.validateUsing(createPostUser);

        return User.create(payload)
    }
}