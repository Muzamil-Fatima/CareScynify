import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      {/* Phone Input */}
      <PhoneInputLib
        country="pk"
        value={value}
        onChange={onChange}
        containerClass="w-full"
        inputStyle={{
          width: "100%",
          height: "48px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          paddingLeft: "60px",
          fontSize: "14px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
        buttonStyle={{
          border: "none",
          background: "transparent",
          width: "55px",
          borderRadius: "12px 0 0 12px",
        }}
        dropdownStyle={{
          borderRadius: "10px",
        }}
        inputClass="focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
      />
    </div>
  );
};

export default PhoneInput;
