import { z } from 'zod'
import { requestUserSchema, userSchema, responseUserSchema, updateUserSchema } from '../schemas/users.schemas'

type TUser = z.infer<typeof userSchema>

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>

type TUpdateRequest = z.infer<typeof updateUserSchema>

export { TUser, TUserRequest, TUserResponse, TUpdateRequest };
