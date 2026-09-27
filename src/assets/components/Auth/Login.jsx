import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    handleLogin(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 p-20 rounded-xl border-emerald-600">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            className="text-white bg-transparent border-2 py-3 px-5 border-emerald-600 text-xl rounded-full placeholder:text-grey-400"
            type="email"
            required
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="text-white bg-transparent border-2 py-3 px-5 border-emerald-600 text-xl rounded-full mt-3 placeholder:text-grey-400"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="text-white mt-5 border-none py-3 px-5 bg-emerald-600 text-xl rounded-full placeholder:text-white"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
