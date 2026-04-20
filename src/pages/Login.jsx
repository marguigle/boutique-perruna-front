import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: SigninErrors } = useAuth();

  const onSubmit = handleSubmit(async (data) => signin(data));

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card con sombra */}
        <div className="bg-white rounded-3xl shadow-elevated overflow-hidden backdrop-blur-sm bg-white/95 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm">
                <span className="text-3xl">🐕</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-beige-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-warm-600">Accede a tu cuenta</p>
          </div>

          {/* Errores */}
          {Array.isArray(SigninErrors) && SigninErrors.length > 0 && (
            <div className="mb-6 space-y-2">
              {SigninErrors.map((error, i) => (
                <div
                  key={i}
                  className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm font-medium"
                >
                  ⚠️ {error}
                </div>
              ))}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-beige-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-1">
                  ✗ {errors.email.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-bold text-beige-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
              />
              {errors.password && (
                <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-1">
                  ✗ {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-gradient-button hover:shadow-warm text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-soft mt-6"
            >
              Ingresar
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-warm-200"></div>
            <span className="px-3 text-warm-600 text-sm font-medium">o</span>
            <div className="flex-grow border-t border-warm-200"></div>
          </div>

          {/* Registro */}
          <p className="text-center text-warm-700 text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-bold text-beige-600 hover:text-orange-600 transition-colors duration-300 no-underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
