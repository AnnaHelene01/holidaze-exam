import * as yup from 'yup';

export const registerSchema = yup
.object({
    name: yup
      .string()
      .matches(/^\w+$/, 'Your name should not contain punctuation symbols apart from underscore (_).')
      .min(2, 'Your name should be at least 2 characters.')
      .required('Please enter your name.'),

      email: yup
      .string()
      .matches(/@(stud\.noroff\.no|noroff\.no)$/, 'Email can only be @stud.noroff.no or @noroff.no')
      .required('Please enter your email.'),

    avatar: yup
    .string()
    .test('valid-url', 'Please enter a valid URL.', (value) => {
    if (!value) return true; // allow empty value
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
    }),

    password: yup
    .string()
    .min(8, 'Your password should be at least 8 characters.')
    .required('Please write a password.'),
})
  .required();

export const loginSchema = yup
.object({
      email: yup
      .string()
      .matches(/@(stud\.noroff\.no|noroff\.no)$/, 'Email can only be @stud.noroff.no or @noroff.no')
      .required('Please enter your email.'),

    password: yup
    .string()
    .min(8, 'Your password should be at least 8 characters.')
    .required('Please write a password.'),
})
  .required();


export const updateAvatar = yup
  .object({
    avatar: yup.string().url("must be an Url or nothing"),
  })
  .required(); 

  
export const createVenueSchema = yup
.object({
  name: yup
    .string()
    .min(1, 'Your title should be at least 1 character.')
    .required('Please write a title.'),

  price: yup
    .number()
    .min(1, 'Your price should be at least 1 NOK per night.')
    .required('Please write a price per night.'),

   media: yup
     .array()
     .of(yup
      .string()
      .url('Please enter a valid URL')
      )
      .notRequired(),



  maxGuests: yup
    .number()
    .min(1, 'You have to have at least 1 guest!')
    .max(100, 'You cannot have more than a 100 guests!')
    .required('Please enter max guests.'),

  description: yup
    .string()
    .min(3, 'Your description should be at least 3 characters long.')
    .required('Please enter a description.'),


    meta: yup
    .object()
    .shape({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),

    location: yup.object().shape({
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      country: yup.string(),
      lat: yup.number(),
      lng: yup.number(),
    }),
});

export const editSchema = yup
.object({
  name: yup.string(),

  media: yup.array().of(yup.string().url("please enter a valid URL")),

  description: yup.string(),

  price: yup
  .number()
  .positive("It must be a positive number")
  .typeError("Price must be a number"),

  maxGuests: yup
    .number()
    .positive("It must be a positive number")
    .typeError("Max Guests must be a number"),

  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),

  location: yup.object().shape({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
  }),
})
