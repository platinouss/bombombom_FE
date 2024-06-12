import Header from "@/components/header/Header";
import SignupForm from "@/components/users/signup/SignupForm";

export default function Signup() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-50">
        <div className="bg-white dark:bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-black text-2xl font-bold mb-6 text-center">회원가입</h1>
          <SignupForm />
        </div>
      </main>
    </div>
  )
}
