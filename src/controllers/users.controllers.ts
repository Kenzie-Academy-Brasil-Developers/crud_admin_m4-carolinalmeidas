import { Response, Request } from "express";
import {
  TUpdateRequest,
  TUser,
  TUserRequest,
  TUserResponse,
} from "../interfaces/users.interfaces";
import listUserService from "../services/user/listUser.services";
import retrieveUserService from "../services/user/retrieveUser.service";
import updateUserService from "../services/user/updateUser.service";
import { createUserService } from "../services/user/createUsers.services";
import deleteUserService from "../services/user/deleteUser.services";
import activeUserService from "../services/user/activeUser.services";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser: TUserResponse = await createUserService(userData);
  return res.status(201).json(newUser);
};

const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUserService();
  return res.json(users);
};

const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = res.locals.token;
  const user = await retrieveUserService(id);
  return res.json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TUpdateRequest = req.body;
  const updateUser = await updateUserService(userId, userData);
  return res.json(updateUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const deleteUser = await deleteUserService(userId);
  return res.status(204).send();
};

const activeUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const user = await activeUserService(userId);
  return res.status(200).json(user);
};

export {
  createUsersController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
  activeUserController,
};
