import { compareSync, hashSync } from 'bcryptjs';
import { default as createError } from 'http-errors';
import { createUser, findOneAndRemoveUser, findOneAndUpdateUser, getAllUsers, getOneUser } from '@/repository/user';
import { sendMail } from './email';
import { sendMessageToQueue } from '@/utils/messageBroker';
import { RABBIMQ_CONFIG } from '@/utils';
import { User } from '@/models';

export const getUsers = (query) => getAllUsers(query);

export const getUserByID = async (id) => {
  const user = await getOneUser({ _id: id });
  if (!user) throw new createError(404, 'Invalid user ID');
  return user;
};

export const changePasswordService = async (user, oldPassword, newPassword) => {
  user = await getOneUser({ _id: user._id }, true); 
  const isPasswordMatch = compareSync(oldPassword, user.password);
  if (!isPasswordMatch) throw new createError(400, 'Invalid current password');
  const hashedPassword = hashSync(newPassword);
  return findOneAndUpdateUser({ email: user.email }, { password: hashedPassword });
};

export const updateUserdetails = async (userId,payload) => {
  if (payload.name) {
    const existingUser = await getOneUser({ name: payload.name, _id: { $ne: userId } });
    if (existingUser) throw new createError(422, 'Name is already taken');
  }
  const updatedUser = await findOneAndUpdateUser({ _id: userId }, payload);
  if (!updatedUser) throw new createError(404, 'Invalid user ID');
  return updatedUser;
};

export const addNewUser = async (payload) => {
  const generatedPassword = Math.random().toString(36).slice(-8);
  const encryptedPassword = hashSync(generatedPassword);
  const newUser = await createUser({
    ...payload,
    password: encryptedPassword,
    is_verified: true,
    role: 'ADMIN'
  });
  try {
    await sendAdminPassword(payload.email, generatedPassword);
    return newUser;
  } catch (e) {
    findOneAndRemoveUser({ email: payload.email }).exec();
    throw e;
  }
};


export const removeUserByID = async (id) => {
  const user = await findOneAndRemoveUser({ _id: id });
  if (!user) {
    throw new createError(401, 'Invalid user ID');
  }
  return user;
};

export const sendnotificationService = async (payload) => {
  const user = await User.find();
  const emailList = user.map((user) => user.email);

  emailList.forEach(async (email) => {
    const mes = await sendMessageToQueue(RABBIMQ_CONFIG.EMAIL_QUEUE, {
      to: email,
      subject: payload.subject,
      text: payload.text
    });
    console.log('Message sent:', email);
  });

  return true;
}


const sendAdminPassword = (email, password) => {
  const replacements = {
    header: 'Welcome To Y3S2!',
    text: `Congratulations on being added as an admin to the Y3S2 admin portal. To login to the system you
    can use the following password -`,
    highlight_text: password,
    action_link: `${process.env.ADMIN_FRONTEND_DOMAIN || 'https://admin.bashaway.sliitfoss.org'}/login`,
    action_text: 'Login',
    disclaimer_text: "You've received this email because you have been chosen as a member of Y3S2 2023."
  };
  const subject = 'Y3S2 - Admin Account Password';
  return sendMail(email, 'call_to_action', replacements, subject);
};
