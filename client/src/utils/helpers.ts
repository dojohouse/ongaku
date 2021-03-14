import { Tag } from "../models"

export const defaultTag = (): Tag => {
 return { "tagId": "", "musicId": "", "title": "", "platform": "spotify" }
}