import { object, string, coerce, array } from "zod";

export const CarSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  year: coerce.number().gt(0),
  category: string().min(1),
  specification: array(string()).nonempty(),
});

export const ContactSchema = object({
  name: string()
    .min(6, "Fullname must be at least 6 characters long!")
    .max(50, "Fullname must be less than 50 characters long!"),
  email: string()
    .min(6, "Email must be at least 6 characters long!")
    .max(30, "Email must be less than 30 characters long!")
    .email("Invalid email address!"),
  subject: string().min(6, "Subject must be at least 6 characters long!"),
  message: string()
    .min(50, "Message must be at least 50 characters long!")
    .max(200, "Message must be less than 200 characters long!"),
});
