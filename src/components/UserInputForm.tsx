const UserInputForm = () => {
  return <div>Routing Works!!!!!!!!!!!!</div>;
};

export default UserInputForm;

// import React from 'react';
// import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

// interface FormData {
//   winningNumber: number;
//   maxInputPerTurn: number;
//   numberOfUsers: number;
//   users: { name: string }[];
// }

// interface Props {
//   onSubmit: SubmitHandler<FormData>;
// }

// const UserInputForm: React.FC<Props> = ({ onSubmit }) => {
//   const { register, handleSubmit, control } = useForm<FormData>();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'users',
//   });

//   const onSubmitForm: SubmitHandler<FormData> = (data) => {
//     onSubmit(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmitForm)}>
//       <label htmlFor="winningNumber">Winning Number:</label>
//       <input type="number" id="winningNumber" {...register('winningNumber', { required: true })} />

//       <label htmlFor="maxInputPerTurn">Max Input per Turn:</label>
//       <input type="number" id="maxInputPerTurn" {...register('maxInputPerTurn', { required: true })} />

//       <label htmlFor="numberOfUsers">Number of Users:</label>
//       <input type="number" id="numberOfUsers" {...register('numberOfUsers', { required: true })} />

//       {fields.map((item, index) => (
//         <div key={item.id}>
//           <label htmlFor={`users[${index}].name`}>User {index + 1} Name:</label>
//           <input
//             type="text"
//             id={`users[${index}].name`}
//             {...register(`users[${index}].name`, { required: true })}
//           />
//           <button type="button" onClick={() => remove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}

//       <button type="button" onClick={() => append({ name: '' })}>
//         Add User
//       </button>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default UserInputForm;





