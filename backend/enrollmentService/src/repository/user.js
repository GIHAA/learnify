import { moduleLogger } from '@sliit-foss/module-logger';
import { User } from '@/models';

const logger = moduleLogger('User-repository');

export const createUser = async (user) => {
  try {
    const newUser = (await new User(user).save()).toObject();
    delete newUser.password;
    logger.info('User created:', newUser);
    return newUser;
  } catch (error) {
    logger.error('Error creating user:', error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const user = await User.find().lean();
    if (!user) {
      logger.warn('No users found.');
      return null;
    }

    delete user.password;
    logger.info('All users retrieved:', user);
    return user;
  } catch (error) {
    logger.error('Error retrieving all users:', error.message);
    throw error;
  }
};

export const getOneUser = async (filters, returnPassword = false) => {
  try {
    const user = await User.findOne(filters).lean();
    if (!user) {
      logger.warn('No user found with filters:', filters);
      return null;
    }

    if (!returnPassword) delete user.password;
    logger.info('User retrieved:', user);
    return user;
  } catch (error) {
    logger.error('Error retrieving user:', error.message);
    throw error;
  }
};

export const findOneAndUpdateUser = async (filters, data) => {
  try {
    const user = await User.findOneAndUpdate(filters, data, { new: true }).lean();
    if (!user) {
      logger.warn('No user found with filters:', filters);
      return null;
    }

    delete user.password;
    logger.info('User updated:', user);
    return user;
  } catch (error) {
    logger.error('Error updating user:', error.message);
    throw error;
  }
};

export const findAndUpdateUsers = async (filters, data) => {
  try {
    const updatedUsers = await User.updateMany(filters, data, { new: true }).lean();
    logger.info('Users updated:', updatedUsers);
    return updatedUsers;
  } catch (error) {
    logger.error('Error updating users:', error.message);
    throw error;
  }
};


export const findOneAndRemoveUser = async (filters) => {
  try {
    const removedUser = await User.findOneAndRemove(filters);
    if (!removedUser) {
      logger.warn('No user found with filters:', filters);
      return null;
    }

    logger.info('User removed:', removedUser);
    return removedUser;
  } catch (error) {
    logger.error('Error removing user:', error.message);
    throw error;
  }
};



