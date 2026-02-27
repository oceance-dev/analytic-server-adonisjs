import vine from '@vinejs/vine'

export const createPostCollect = vine.compile(
    vine.object({
        site_id: vine.string(),
        path: vine.string().trim().minLength(4).maxLength(255),
        referrer: vine.string().trim().minLength(4).optional(),
        device: vine.object({
            type: vine.string(),
            vendor: vine.string().optional(),
            model: vine.string().optional(),
        }),
        os: vine.object({
            name: vine.string(),
            version: vine.string()
        }),
        browser: vine.object({
            name: vine.string(),
            version: vine.string(),
        })
    })
)