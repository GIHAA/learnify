import { default as createError } from 'http-errors';
import Stripe from 'stripe';
import {
  addEnrollmentRepo,
  getAllEnrollmentsRepo,
  getOneEnrollmentRepo,
  removeEnrollmentRepo,
  updateEnrollmentRepo
} from '@/repository/enrollment';

const stripe = Stripe(
  'sk_test_51MCtGXBSWDySeSWs9CEwAXiY6gWBLdPVSmSpqqQeO9hIqoKz96uWcKUfaTIKzCVRgyq7gNLQxgJeuZJVjDnL2nBl00msAdXy8S'
);

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

export const updateEnrollmentService = async (itemid, payload) => {
  const updatedItems = await updateEnrollmentRepo({ _id: itemid }, payload);
  return updatedItems;
};

export const removeEnrollmentService = async (id) => {
  const Enrollments = await removeEnrollmentRepo({ _id: id });
  if (!Enrollments) throw new createError(401, 'Invalid Enrollment ID');
  return Enrollments;
};

export const getPaymentIntentService = async (payload) => {
  const { amount, currency } = payload;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: currency || 'usd',
    metadata: { integration_check: 'accept_a_payment' }
  });

  if (!paymentIntent) throw new createError(401, 'Payment Intent Creation Failed');

  return paymentIntent;

  // let totalEarnings = 0;
  // let totalOrders = 0;
  // const limit = 100; // Max limit per API call as defined by Stripe

  // let hasMore = true;
  // let startingAfter = null;

  // while (hasMore) {
  //   const params = {
  //     limit: limit,
  //   };
  //   if (startingAfter) {
  //     params.starting_after = startingAfter;
  //   }

  //   try {
  //     const charges = await stripe.charges.list(params);

  //     // Accumulate totals
  //     charges.data.forEach(charge => {
  //       if (charge.paid && !charge.refunded) {
  //         totalEarnings += charge.amount;
  //         totalOrders += 1;
  //       }
  //     });

  //     if (charges.data.length < limit) {
  //       hasMore = false;
  //     } else {
  //       startingAfter = charges.data[charges.data.length - 1].id;
  //     }
  //   } catch (error) {
  //     console.error(`Error fetching charges: ${error.message}`);
  //     break;
  //   }
  // }

  // return {
  //   totalEarnings: totalEarnings / 100, 
  //   totalOrders: totalOrders
  // };

};


export const getPaymentDetailsService = async (id) => {

  const paymentIntent = await stripe.paymentIntents.retrieve(id);

  if (!paymentIntent) throw new createError(401, 'Payment Intent Fetching Failed');

  return paymentIntent;
}