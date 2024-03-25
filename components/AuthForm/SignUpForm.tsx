import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().min(3, "El nombre debe contener 3 caracteres"),
  email: z.string().email("El email debe tener un formato correcto"),
  password: z
    .string()
    .min(7, "La contraseña debe contener mínimo 7 caracteres")
    .max(20, "La contraseña debe contener máximo 20 caracteres"),
  accept: z.boolean(),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function SignUpForm({ resetTab }: { resetTab: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const signUp = useCallback((data: SignUpSchemaType) => {
    setIsLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => toast.success("¡Usuario creado correctamente!"))
      .finally(() => {
        setIsLoading(false);
        resetTab();
      });
  }, []);

  return (
    <div className="w-4/5 md:w-2/3 xl:w-1/3 2xl:w-1/4 mt-4">
      <form onSubmit={handleSubmit(signUp)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nombre</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-error my-2">{errors.name.message}</span>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-error my-2">{errors.email.message}</span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Contraseña</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-error my-2">{errors.password.message}</span>
          )}
        </label>

        <div className="form-control mt-4">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => setValue("accept", e.target.checked)}
            />
            <span
              className={`label-text ml-4 ${
                errors.accept?.message && "text-error"
              }`}
            >
              Acepto las condiciones de uso y la información básica sobre
              protección de datos.
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mt-4 bg-primary"
        >
          {isLoading && <span className="loading loading-spinner" />}
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
