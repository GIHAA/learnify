import { addNewUser, getUserByID, getUsers, updateUserdetails } from '@/services/user';
import { makeResponse } from '@/utils/response';
import { create, getAll, getById, update } from '../src/controllers/user';

jest.mock('@/services/user', () => ({
  addNewUser: jest.fn(),
  getUsers: jest.fn(),
  getUserByID: jest.fn(),
  updateUserdetails: jest.fn(),
  changePasswordService: jest.fn(),
}));

jest.mock('@/utils/response', () => ({
  makeResponse: jest.fn()
}));

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('create - adds a new user and returns success response', async () => {
    const req = { body: {} };
    const res = {};
    addNewUser.mockResolvedValue('newUser');
    await create(req, res);
    expect(addNewUser).toHaveBeenCalledWith(req.body);
    expect(makeResponse).toHaveBeenCalledWith({
      res,
      data: 'newUser',
      message: 'User added successfully'
    });
  });

  test('getAll - retrieves all users and returns success response', async () => {
    const req = { query: {} };
    const res = {};
    getUsers.mockResolvedValue('allUsers');
    await getAll(req, res);
    expect(getUsers).toHaveBeenCalledWith(req.query);
    expect(makeResponse).toHaveBeenCalledWith({
      res,
      data: 'allUsers',
      message: 'Users retrieved successfully'
    });
  });

  test('getById - retrieves a user by ID and returns success response', async () => {
    const req = { params: { id: 'userId' } };
    const res = {};
    getUserByID.mockResolvedValue('userById');
    await getById(req, res);
    expect(getUserByID).toHaveBeenCalledWith('userId');
    expect(makeResponse).toHaveBeenCalledWith({
      res,
      data: 'userById',
      message: 'User retrieved successfully'
    });
  });

  test('updates user details and returns success response', async () => {
    const req = {
      params: { id: 'userId' },
      user: 'currentUser',
      body: { updatedData: 'newData' }
    };
    const res = {};

    updateUserdetails.mockResolvedValue('updatedUser');
    await update(req, res);

    expect(updateUserdetails).toHaveBeenCalledWith('userId', 'currentUser', { updatedData: 'newData' });
    expect(makeResponse).toHaveBeenCalledWith({
      res,
      data: 'updatedUser',
      message: 'User updated successfully'
    });
  });
});
