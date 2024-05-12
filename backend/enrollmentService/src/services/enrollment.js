import { default as createError } from 'http-errors';
import Stripe from 'stripe';
import {
  addEnrollmentRepo,
  getAllEnrollmentsRepo,
  getOneEnrollmentRepo,
  removeEnrollmentRepo,
  updateEnrollmentRepo,
  getAllUserEnrollmentsRepo
} from '@/repository/enrollment';

// const stripe = Stripe(
//   'sk_test_51MCtGXBSWDySeSWs9CEwAXiY6gWBLdPVSmSpqqQeO9hIqoKz96uWcKUfaTIKzCVRgyq7gNLQxgJeuZJVjDnL2nBl00msAdXy8S'
// );

export const addEnrollmentService = async (payload) => {
  const newEnrollment = await addEnrollmentRepo({
    ...payload
  });
  return newEnrollment;
};

export const getAllEnrollmentsService = (query) => {
  const enrollments = getAllEnrollmentsRepo(query);
  if (enrollments.length === 0) throw new createError(404, 'No Enrollments Found');

  return enrollments;
};

export const getOneEnrollmentService = async (id) => {
  const Enrollments = await getOneEnrollmentRepo({ _id: id });
  if (!Enrollments) throw new createError(401, 'Invalid Enrollment ID');
  return Enrollments;
};

export const getUserEnrollmentsService = async (id , query) => {
  const Enrollments = await getAllUserEnrollmentsRepo({ userId: id } , query);
  if (!Enrollments) throw new createError(401, 'Invalid Enrollment ID');
  return Enrollments;

}

export const updateEnrollmentService = async (itemid, payload) => {
  const enrollment = await getOneEnrollmentRepo({ _id: itemid });
  if (!enrollment) throw new createError(401, 'Invalid Enrollment ID');

  if(enrollment.totalSections < payload.completedSections) {
    throw new createError(401, 'Invalid completedSections value');
  }

  const updatedItems = await updateEnrollmentRepo({ _id: itemid }, payload);
  return updatedItems;
};

export const removeEnrollmentService = async (id) => {
  const Enrollments = await removeEnrollmentRepo({ _id: id });
  if (!Enrollments) throw new createError(401, 'Invalid Enrollment ID');
  return Enrollments;
};