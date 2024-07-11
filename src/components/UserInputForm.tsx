import React, { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGame } from "../models/GameContext"
import "./UserInputFormStyles.css";

interface FormData {
  winningNumber: number;
  maxInputPerTurn: number;
  numberOfUsers: number;
  users: { name: string }[];
}

const UserInputForm: React.FC = () => {
  const { setGameData } = useGame();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      numberOfUsers: 2,
      users: [{ name: "" }, { name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "users" });
  const navigate = useNavigate();
  const numberOfUsers = watch("numberOfUsers");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setGameData({
      users: data.users,
      winningNumber: data.winningNumber,
      maxInputPerTurn: data.maxInputPerTurn,
      setGameData,
    });
    navigate("/shuffle-users");
  };

  useEffect(() => {
    const currentLength = fields.length;
    if (numberOfUsers < 2) {
      setError("numberOfUsers", {
        message: "Minimum two players needed.",
      });
    } else if (numberOfUsers > 5) {
      setError("numberOfUsers", {
        message: "Maximum 5 players can play at a time.",
      });
    } else {
      clearErrors("numberOfUsers");
      if (numberOfUsers > currentLength) {
        for (let i = currentLength; i < numberOfUsers; i++) {
          append({ name: "" });
        }
      } else if (numberOfUsers < currentLength) {
        for (let i = currentLength; i > numberOfUsers; i--) {
          remove(i - 1);
        }
      }
    }
  }, [numberOfUsers, append, remove, fields.length, setError, clearErrors]);

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <TextField
            label="Winning Number"
            type="number"
            {...register("winningNumber", { required: true })}
            error={!!errors.winningNumber}
            helperText={errors.winningNumber ? "This field is required" : ""}
            fullWidth
          />
        </div>

        <div className="form-group">
          <TextField
            label="Max Input per Turn"
            type="number"
            {...register("maxInputPerTurn", { required: true })}
            error={!!errors.maxInputPerTurn}
            helperText={errors.maxInputPerTurn ? "This field is required" : ""}
            fullWidth
          />
        </div>

        <div className="form-group">
          <TextField
            label="Number of Users"
            type="number"
            {...register("numberOfUsers", { required: true })}
            error={!!errors.numberOfUsers}
            helperText={errors.numberOfUsers ? errors.numberOfUsers.message : ""}
            fullWidth
          />
        </div>

        {numberOfUsers >= 2 && numberOfUsers <= 5 && fields.map((item, index) => (
          <div className="form-group" key={item.id}>
            <TextField
              label={`User ${index + 1} Name`}
              {...register(`users.${index}.name`, { required: true })}
              error={!!errors.users?.[index]?.name}
              helperText={
                errors.users?.[index]?.name ? "This field is required" : ""
              }
              fullWidth
            />
          </div>
        ))}

        <div className="button-container">
          <button className="button-24" role="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInputForm;

