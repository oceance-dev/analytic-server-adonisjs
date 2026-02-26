import vine from '@vinejs/vine'

export const createPostCollect = vine.compile(
    vine.object({
        site_id: vine.string(),
        path: vine.string().trim().minLength(4).maxLength(255),
        referrer: vine.string().trim().minLength(4).optional(),
        device: vine.object({
            width: vine.number(),
            height: vine.number(),
            availWidth: vine.number(),
            availHeight: vine.number(),
            devicePixelRatio: vine.number(),
        }),
    })
)