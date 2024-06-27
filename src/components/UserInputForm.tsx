import React, { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./UserInputFormStyles.css";

interface FormData {
  winningNumber: number;
  maxInputPerTurn: number;
  numberOfUsers: number;
  users: { name: string }[];
}

interface FormDataProps {
  onSubmit: SubmitHandler<FormData>;
}

const UserInputForm: React.FC<FormDataProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });
  const navigate = useNavigate();
  const numberOfUsers = watch("numberOfUsers");

  const onSubmitForm: SubmitHandler<FormData> = (data) => {
    navigate("/shufflingPage", { state: { users: data.users } });
    onSubmit(data);
  };

  useEffect(() => {
    const currentLength = fields.length;
    if (numberOfUsers > currentLength) {
      for (let i = currentLength; i < numberOfUsers; i++) {
        append({ name: "" });
      }
    } else if (numberOfUsers < currentLength) {
      for (let i = currentLength; i > numberOfUsers; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfUsers, append, remove, fields.length]);

  return (
    <>
      <h1>TwentyOne Game!!</h1>
      <div>
        <form className="form-container" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="form-group">
            <label htmlFor="winningNumber">Winning Number:</label>
            <input
              type="number"
              id="winningNumber"
              {...register("winningNumber", { required: true })}
            />
            {errors.winningNumber && (
              <span className="error">This field is required</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="maxInputPerTurn">Max Input per Turn:</label>
            <input
              type="number"
              id="maxInputPerTurn"
              {...register("maxInputPerTurn", { required: true })}
            />
            {errors.maxInputPerTurn && (
              <span className="error">This field is required</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="numberOfUsers">Number of Users:</label>
            <input
              type="number"
              id="numberOfUsers"
              {...register("numberOfUsers", { required: true })}
            />
            {errors.numberOfUsers && (
              <span className="error">This field is required</span>
            )}
          </div>

          {fields.map((item, index) => (
            <div className="form-group" key={item.id}>
              <label htmlFor={`users[${index}].name`}>
                User {index + 1} Name:
              </label>
              <input
                type="text"
                id={`users[${index}].name`}
                {...register(`users.${index}.name`, { required: true })}
              />
              {errors.users && errors.users[index] && (
                <span className="error">This field is required</span>
              )}
            </div>
          ))}

          <div className="button-container">
            <button className="button-24" role="button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserInputForm;



