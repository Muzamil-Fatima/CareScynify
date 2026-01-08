import React from "react";

const Future = () => {
  const field = [
    {
      title: "Real-World Projects",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi  inventore autem mollitia eaque cum accusamus similique reiciendis,  nesciunt perferendis in",
      icon: (
        <svg
          fill="#9810fa"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19,6H16V5a2,2,0,0,0-2-2H10A2,2,0,0,0,8,5V6H5A3,3,0,0,0,2,9v9a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM10,5h4V6H10ZM20,18a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12.39L8.68,14A1.19,1.19,0,0,0,9,14h6a1.19,1.19,0,0,0,.32-.05L20,12.39Zm0-7.72L14.84,12H9.16L4,10.28V9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1Z" />
        </svg>
      ),
    },
    {
      title: "Expert Mentorship",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi  inventore autem mollitia eaque cum accusamus similique reiciendis,  nesciunt perferendis in",
      icon: (
        <svg
          width="32px"
          height="32px"
          viewBox="-1 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="user" transform="translate(-3 -2)">
            <path
              id="secondary"
              fill="#9810fa"
              d="M9,15h6a5,5,0,0,1,5,5h0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1H4a5,5,0,0,1,5-5Z"
            />
            <path
              id="primary"
              d="M20,20h0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1H4a5,5,0,0,1,5-5h6A5,5,0,0,1,20,20ZM12,3a4,4,0,1,0,4,4A4,4,0,0,0,12,3Z"
              fill="none"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </svg>
      ),
    },
    {
      title: "Boost Your Career",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi  inventore autem mollitia eaque cum accusamus similique reiciendis,  nesciunt perferendis in",
      icon: (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 256 246"
          enable-background="new 0 0 256 246"
          xml:space="preserve"
        >
          <path
            d="M254,150.588v93.343H53.545v-31.916h64.591v-28.727h60.744v-32.7H254z M113.175,18.875c0,9.282,7.524,16.806,16.806,16.806
	s16.806-7.524,16.806-16.806s-7.524-16.806-16.806-16.806S113.175,9.593,113.175,18.875z M189.915,100.17
	c-1.62,3.746-6.074,5.264-9.82,3.543l-31.182-14.68c-1.822-0.81-3.341-2.43-3.948-4.353L139.7,69.798l-7.289,36.463l24.593,0.506
	c5.264,0.101,9.415,4.556,9.314,9.82l-1.316,50.999c-0.101,5.264-4.454,9.415-9.618,9.415c0,0-0.101,0-0.203,0
	c-5.366-0.101-9.516-4.556-9.415-9.82l1.114-41.483l-30.668-0.709l-7.087,35.113c-0.304,1.417-0.911,2.936-1.721,4.151
	l-26.224,37.721c-3.341,4.859-9.82,5.872-14.68,2.531c-4.758-3.341-5.872-9.82-2.43-14.579l24.908-35.494l15.963-90.455
	L73.183,93.305c-0.556,0.513-1.173,0.919-1.823,1.224l2.972,2.972l-8.68,8.68l14.466,14.466L68.545,132.22L22.253,85.927
	l11.573-11.573l14.466,14.466l8.68-8.68l4.843,4.842c0.369-0.79,0.883-1.527,1.553-2.164l39.78-37.769
	c5.25-4.518,13.672-7.244,20.962-6.029l6.884,1.316c9.213,1.62,16.299,7.897,19.236,16.097l7.492,20.552l28.448,13.364
	C189.915,91.97,191.535,96.424,189.915,100.17z M67.099,97.501L56.972,87.374l-5.063,5.063l10.127,10.127L67.099,97.501z
	 M56.972,126.433l-2.893,2.893l-5.786-5.787l2.893-2.893l-17.36-17.36l-2.893,2.893l-5.787-5.787l2.893-2.893l-8.68-8.68L2,106.18
	l46.293,46.293l17.36-17.36L56.972,126.433z"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="bg-linear-to-b from white to-blue-50">
      <div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center p-6 sm:p-10">
          Internship That Transforms Your Future
        </h2>
        <p className="w-full sm:w-4/5 lg:w-1/2 text-center m-auto leading-relaxed mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi
          inventore autem mollitia eaque cum accusamus similique reiciendis,
          nesciunt perferendis in, aut dolorum dolor quis corrupti. Repellat
          delectus dolorum iste?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-6 items-center m-4 sm:m-6 lg:m-10 bg-white rounded-lg">
        {field.map((item, index) => (
          <div
            key={index}
            className="bg-purple-6 flex flex-col gap-2.5 items-center p-4 sm:p-6 w-full shadow-2xl shadow-gray-300 rounded-lg hover:shadow-xl"
          >
            <div className="bg-linear-to-br from-blue-100 via-purple-400 to bg-blue-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center hover:rotate-45 ">
              {item.icon}
            </div>
            <p className="font-bold text-2xl">{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Future;
