import { logoColorNoBackground } from "../assets/image";

function Footer() {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="mb-4 flex items-center justify-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <img
              src={logoColorNoBackground}
              className="h-10"
              alt="Flowbite Logo"
            />
          </a>
          <ul className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="#"
                className="hover:text-skyBlue hover:underline md:me-6"
              >
                Website
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-skyBlue hover:underline md:me-6"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-skyBlue hover:underline md:me-6"
              >
                Github
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-skyBlue hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a
            href="https://giuseppe-vassallo.netlify.app/"
            className="hover:underline"
          >
            Giuseppe Vassallo
          </a>
          .
        </span>
      </div>
    </footer>
  );
}

export default Footer;
