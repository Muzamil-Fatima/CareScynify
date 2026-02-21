import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = ({ value, onChange, label = "Phone" }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700">{label}</label>
      <PhoneInputLib
        country="pk"
        inputStyle={{
          width: "100%",
          height: "42px",
          border: "none",
          outline: "none",
          boxShadow: "none",
          paddingLeft: "60px", // flag + country code space
        }}
        buttonStyle={{
          border: "none",
          background: "transparent",
          padding: 0,
          margin: 0,
          height: "100%",
          width: "60px", // flag + code width
        }}
        value={value}
        onChange={onChange}
        containerClass="w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-400"
        inputClass="w-full h-[42px] px-3 pl-[48px] border-none focus:outline-none"
      />
    </div>
  );
};

export default PhoneInput;
