import vine from '@vinejs/vine'

export const createPostSites = vine.compile(
    vine.object({
        user_id: vine.string(),
        domain: vine.string()
    })
)