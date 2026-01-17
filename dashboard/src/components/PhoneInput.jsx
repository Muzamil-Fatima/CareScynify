import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = ({ value, onChange, label = "Phone" }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700">{label}</label>
      <PhoneInputLib
        country="pk"
        value={value}
        onChange={onChange}
        containerClass="w-full" // container full width
        inputClass="w-full h-12 border border-gray-300 rounded-r-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        buttonClass="h-12 border border-gray-300 rounded-l-lg" // flag button same height
        dropdownClass="shadow-lg rounded-lg"
        enableSearch // optional: search countries
      />
    </div>
  );
};

export default PhoneInput;
