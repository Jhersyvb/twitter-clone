import { signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        viewBox="0 0 24 24"
      >
        <path
          fill="#ffffff"
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
        />
      </svg>
      <div>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sing in with {provider.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login
