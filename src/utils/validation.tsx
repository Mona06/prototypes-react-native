import * as yup from 'yup';

export const eventSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  description: yup.string().required('Event description is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date cannot be before start date'),
  location: yup.string().required('Location is required'),
});
