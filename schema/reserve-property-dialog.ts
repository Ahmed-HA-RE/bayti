import z from 'zod';
import { contactAgentSchema } from './contact-agent';
import { isWithinInterval, addWeeks, startOfDay } from 'date-fns';

export const reservePropertyDialogSchema = z.object({
  name: contactAgentSchema.shape.name,
  email: contactAgentSchema.shape.email,
  phoneNumber: contactAgentSchema.shape.phoneNumber,
  date: z.date({ error: 'Please select a date' }).refine(
    (date) => {
      // Reservations can only be made for dates within the next 2 weeks
      const today = startOfDay(new Date());
      const twoWeeksFromNow = addWeeks(today, 2);
      return isWithinInterval(date, { start: today, end: twoWeeksFromNow });
    },
    { error: 'Please select a date within the next 2 weeks.' },
  ),
  timeRange: z.string({ error: 'Please select a time' }).refine(
    (data) => {
      const [start, end] = data.split('-').map((t) => t.trim());
      return start && end; // Ensure both start and end times are provided
    },
    { error: 'Please select a valid time range.' },
  ),
});

export type ReservePropertyDialogFormData = z.infer<
  typeof reservePropertyDialogSchema
>;
