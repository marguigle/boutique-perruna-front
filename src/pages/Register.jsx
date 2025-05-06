import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAutenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticated) navigate("/edit");
  }, [isAutenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className=" flex flex-col border rounded-md bg-gray-300 w-1/2"
      >
        <p className="text-white p-2.5 m-2.5 text-2xl font-extrabold">
          REGISTRO DE USUARIO
        </p>
        {RegisterErrors.map((error, i) => (
          <div
            key={i}
            className="bg-red-500 text-center p-1 m-2 font-bold text-white  rounded-md w-2/3"
          >
            {error}
          </div>
        ))}

        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="nombre de usuario"
          className="rounded-md bg-white px-2 py-1.5 m-2 "
        />
        {errors.username && (
          <p className="text-red-500 px-2 font-extrabold rounded-sm w-full text-left">
            username is required
          </p>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="contraseña"
          className="bg-white rounded-md px-2 py-1.5 m-2 "
        />
        {errors.password && (
          <p className="text-red-500 px-2 font-extrabold rounded-sm w-full text-left">
            Password is required
          </p>
        )}

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email"
          className="bg-white rounded-md px-2 py-1.5 m-2 "
        />
        {errors.email && (
          <p className="text-red-500 px-2 font-extrabold rounded-sm w-full text-left">
            Email is required
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2.5 m-2 rounded-md w-1/4"
        >
          Registrar
        </button>
      </form>
    </>
  );
}

export default Register;
