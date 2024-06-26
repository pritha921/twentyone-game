import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
  winningNumber: number;
  maxInputPerTurn: number;
  numberOfUsers: number;
  users: { name: string }[];
}

interface Props {
  onSubmit: SubmitHandler<FormData>;
}

const UserInputForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });
  const navigate = useNavigate();
  const numberOfUsers = watch('numberOfUsers');

  const onSubmitForm: SubmitHandler<FormData> = (data) => {
    navigate('/shufflingPage', { state: { users: data.users } });
    onSubmit(data);
  };

  useEffect(() => {
    const currentLength = fields.length;
    if (numberOfUsers > currentLength) {
      for (let i = currentLength; i < numberOfUsers; i++) {
        append({ name: '' });
      }
    } else if (numberOfUsers < currentLength) {
      for (let i = currentLength; i > numberOfUsers; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfUsers, append, remove, fields.length]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <label htmlFor="winningNumber">Winning Number:</label>
      <input
        type="number"
        id="winningNumber"
        {...register('winningNumber', { required: true })}
      />
      {errors.winningNumber && <span>This field is required</span>}

      <label htmlFor="maxInputPerTurn">Max Input per Turn:</label>
      <input
        type="number"
        id="maxInputPerTurn"
        {...register('maxInputPerTurn', { required: true })}
      />
      {errors.maxInputPerTurn && <span>This field is required</span>}

      <label htmlFor="numberOfUsers">Number of Users:</label>
      <input
        type="number"
        id="numberOfUsers"
        {...register('numberOfUsers', { required: true })}
      />
      {errors.numberOfUsers && <span>This field is required</span>}

      {fields.map((item, index) => (
        <div key={item.id}>
          <label htmlFor={`users[${index}].name`}>User {index + 1} Name:</label>
          <input
            type="text"
            id={`users[${index}].name`}
            {...register(`users.${index}.name`, { required: true })}
          />
          {errors.users && errors.users[index] && (
            <span>This field is required</span>
          )}
        </div>
      ))}


      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInputForm;

