import { addEnrollmentService ,  getAllEnrollmentsService, getUserEnrollmentsService , getOneEnrollmentService,  updateEnrollmentService , removeEnrollmentService  } from '@/services/enrollment';
import { makeResponse } from '@/utils/response';

export const addEnrollment = async (req, res) => {
  const ProducateData = req.body;
  const order = await addEnrollmentService(ProducateData);
  return makeResponse({ res, data: order, message: 'enrollment added successfully' });
 
};
export const getAllEnrollments = async (req, res) => {
  const orders = await getAllEnrollmentsService(req.query);
  return makeResponse({ res, data: orders, message: 'enrollment retrieved All successfully' });
};

export const getUserEnrollments = async (req, res) => {
  const enrollments = await getUserEnrollmentsService(req.params.id , req.query);
  return makeResponse({ res, data: enrollments, message: 'enrollment retrieved successfully' });
}

export const getOneEnrollment = async (req, res) => {
  const orders = await getOneEnrollmentService(req.params.id);
  return makeResponse({ res, data: orders, message: 'enrollment retrieved successfully' });
};

export const updateEnrollment = async (req, res) => {
  const orders = await updateEnrollmentService(req.params.id, req.body);
  return makeResponse({ res, data: orders, message: 'enrollment updated successfully' });
};

export const removeEnrollment = async (req, res) => {
  const orders = await removeEnrollmentService(req.params.id);
  return makeResponse({ res, data: orders, message: 'enrollment removed successfully' });
};