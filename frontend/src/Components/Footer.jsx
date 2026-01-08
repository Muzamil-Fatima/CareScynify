import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white p-4 sm:px-8 lg-px-16 py-10 space-y-10 font-medium">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 ">
          TecHub
        </h2>
        <p>Address xyz.</p>
        <p>
          <span>+92 XXXXXXXXXX</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-xl">Quick Link</h3>
          <ul className="text-gray-500 space-y-1">
            <li>Home</li>
            <li>About</li>
            <li>Internship</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-xl">Legal</h3>
          <ul className="text-gray-500">
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
            <li>Refund & Cancellation</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-xl">
            Trusted References
          </h3>
          <ul className="text-gray-500">
            <li>HEC</li>
            <li>Digital Pakistan</li>
            <li>XYZ</li>
            <li>XYZ</li>
            <li>XYZ</li>
          </ul>
        </div>
      </div>
      <div className="space-y-3">
        <h6 className="text-white font-semibold text-xl">NewsLetter</h6>
        <p className="text-gray-500 ">
          Subscribe to get the latest updates, offers, and news from TecHub.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            className="w-full sm:w-64 px-3 py-2 rounded-xl border-2"
          />
          <button className="bg-blue-700  px-4 py-2  rounded-xl transform transition duration-200 hover:scale-105 ">
            Subscribe
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-white font-semibold text-xl">Follow Us</p>
        <ul className="flex gap-4 items-center">
          <li>
            <a href="">
              <svg
                fill="#ffffff"
                width="36px"
                height="36px"
                viewBox="-3 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                class="cf-icon-svg"
                className="transform transition duration-200 hover:scale-105"
              >
                <path d="M12.538 9.62a6.038 6.038 0 1 0-6.981 5.964v-4.22H4.023V9.62h1.534V8.29a2.13 2.13 0 0 1 2.28-2.349 9.285 9.285 0 0 1 1.352.118v1.486h-.762a.873.873 0 0 0-.984.943V9.62h1.675l-.268 1.746H7.443v4.22a6.04 6.04 0 0 0 5.095-5.966z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="">
              <svg
                fill="#ffffff"
                width="28px"
                height="28px"
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition duration-200 hover:scale-105"
              >
                <path d="M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition duration-200 hover:scale-105"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 1a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H3zm1.102 4.297a1.195 1.195 0 100-2.39 1.195 1.195 0 000 2.39zm1 7.516V6.234h-2v6.579h2zM6.43 6.234h2v.881c.295-.462.943-1.084 2.148-1.084 1.438 0 2.219.953 2.219 2.766 0 .087.008.484.008.484v3.531h-2v-3.53c0-.485-.102-1.438-1.18-1.438-1.079 0-1.17 1.198-1.195 1.982v2.986h-2V6.234z"
                  fill="#ffffff"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <p className="text-center text-sm text-gray-400">
          © 2025-26 Muzamil. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
