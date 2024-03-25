export async function authenticate(credentials: {
  email: string;
  password: string;
}) {
  const user = await fetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return user;
}
