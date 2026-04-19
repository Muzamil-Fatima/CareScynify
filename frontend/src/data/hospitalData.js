const hospitals = [
  {
    id: 1,
    name: "City Hospital",
    location: "Gujranwala, Civil Lines",
    address: "Main GT Road, Near Clock Tower",
    phone: "03001112233",
    rating: 4.8,
    departments: [
      {
        id: 101,
        name: "Cardiology",
        doctors: [
          {
            id: 1,
            name: "Dr. Ahmed Khan",
            specialization: "Cardiologist",
            experience: "10 years",
          },
          {
            id: 2,
            name: "Dr. Bilal Shah",
            specialization: "Heart Specialist",
            experience: "8 years",
          },
        ],
      },
      {
        id: 102,
        name: "Dermatology",
        doctors: [
          {
            id: 3,
            name: "Dr. Sara Ali",
            specialization: "Skin Specialist",
            experience: "6 years",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Medicare Hospital",
    location: "Gujranwala, Model Town",
    address: "Main Boulevard Model Town",
    phone: "03005556677",
    rating: 4.6,
    departments: [
      {
        id: 201,
        name: "Orthopedic",
        doctors: [
          {
            id: 4,
            name: "Dr. Usman Raza",
            specialization: "Bone Specialist",
            experience: "9 years",
          },
        ],
      },
    ],
  },
];

export default hospitals;