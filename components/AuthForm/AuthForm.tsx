"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="h-[75vh] flex flex-col items-center justify-center">
      <div className="w-4/5 md:w-2/3 xl:w-1/3 2xl:w-1/4 text-center bg-gray-200 rounded-md p-2 flex">
        <a
          className={`w-1/2 cursor-pointer flex items-center justify-center ${
            activeTab === 0 && "bg-primary rounded-md p-2 text-white"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Inicia sesión
        </a>
        <a
          className={`w-1/2 cursor-pointer flex items-center justify-center text-center ${
            activeTab === 1 && "bg-primary p-2 rounded-md text-white"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Regístrate
        </a>
      </div>

      {activeTab === 0 && <LoginForm />}

      {activeTab === 1 && <SignUpForm resetTab={() => setActiveTab(0)} />}
    </div>
  );
}
