import { signIn } from "next-auth/react";
import GoogleIcon from "../Icons/Google";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@/constants/routes";

const LoginSchema = z.object({
  email: z.string().email("El email debe tener un formato correcto"),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const login = useCallback((data: LoginSchemaType) => {
    const { email, password } = data;
    setIsLoading(true);
    signIn("credentials", { email, password, redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error(res?.error);
          return;
        }

        router.replace(HOME_ROUTE);
        return router.refresh();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-4/5 md:w-2/3 xl:w-1/3 2xl:w-1/4 mt-4">
      <form onSubmit={handleSubmit(login)}>
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

        <button
          type="submit"
          className="btn btn-primary btn-block mt-4 bg-primary"
        >
          {isLoading && <span className="loading loading-spinner" />}
          Iniciar sesión
        </button>
      </form>

      <div className="flex items-center my-10">
        <div className="flex-grow border-b border-gray-300"></div>
        <div className="mx-4 text-gray-500 font-bold">O</div>
        <div className="flex-grow border-b border-gray-300"></div>
      </div>

      <button className="btn btn-block" onClick={() => signIn("google")}>
        <GoogleIcon />
        <p className="ml-1">Inicia sesión con Google</p>
      </button>
    </div>
  );
}
