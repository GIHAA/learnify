import { addNewUser, changePasswordService, getUserByID, getUsers, updateUserdetails,removeUserByID , sendnotificationService } from '@/services/user';
import { makeResponse } from '@/utils/response';

export const create = async (req, res) => {
  const user = await addNewUser(req.body);
  return makeResponse({ res, data: user, message: 'User added successfully' });
};

export const getAll = async (req, res) => {
  const users = await getUsers(req.query);
  return makeResponse({ res, data: users, message: 'Users retrieved successfully' });
};

export const getById = async (req, res) => {
  const user = await getUserByID(req.params.id);
  return makeResponse({ res, data: user, message: 'User retrieved successfully' });
};

export const update = async (req, res) => {
  const user = await updateUserdetails(req.params.id, req.body);
  return makeResponse({ res, data: user, message: 'User updated successfully' });
};

export const changePassword = async (req, res) => {
  await changePasswordService(req.user, req.body.old_password, req.body.new_password);
  return makeResponse({ res, message: 'Password changed successfully' });
};

export const remove = async (req, res) => {
  try {
    const items = await removeUserByID(req.params.id);
    return makeResponse({ res, data: items, message: 'User removed successfully' });
  } catch (error) {
    return makeResponse({ res, error });
  }
};

export const sendnotification = async (req, res) => {
  try {
    const user = await sendnotificationService(req.body);
    return makeResponse({ res, data: user, message: 'Users Notifications sent' });
  } catch (error) {
    return makeResponse({ res, error });
  }
}
