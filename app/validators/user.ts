import vine from '@vinejs/vine'

export const createPostUser = vine.compile(
    vine.object({
        fullName: vine.string().trim().minLength(4).maxLength(100),
        email: vine.string().email(),
        password: vine.string()
    })
)