import { default as createError } from 'http-errors';
import { createfeedbacke, getAllfeedbacke,  getOnefeedbacke, removefeedbacke, updatefeedbacke,imagefindbyid } from '@/repository/feedback';

export const addFeedbacknew = async (payload) => {
  const newFeedback = await createfeedbacke({
    ...payload
  });
  return newFeedback;
};

export const getFeedback = (query) => getAllfeedbacke(query);

export const getFeedbackbtID = async (id) => {
  const Feedbacks = await  getOnefeedbacke({ _id: id });

  if (!Feedbacks) throw new createError(401, 'Invalid Feedback ID');

  return Feedbacks;
};

export const updatFeedback = async (itemid, payload) => {
  const updatedItems = await updatefeedbacke({ _id: itemid }, payload);
  return updatedItems;
};

export const deleteFeedback = async (id) => {
  const Feedbacks = await removefeedbacke({ _id: id });
  if (!Feedbacks) throw new createError(401, 'Invalid Feedback ID');
  return Feedbacks;
};

export const findImage = (filename,res)=>{

  imagefindbyid(filename,res)
}
