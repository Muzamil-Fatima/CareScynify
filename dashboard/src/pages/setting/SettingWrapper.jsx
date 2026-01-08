import { useNavigate } from "react-router-dom";

const SettingWrapper = ({ icon, title, description, icon1, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <div className="w-2/5 ml-4 mt-10 font-secondary border-[1.3px] py-6 px-8 border-white/15 rounded-2xl">
      <div className="flex justify-between">
        <img src={icon} alt="" className="w-8 h-8" />
        <div
          onClick={() => navigate(navigateTo)}
          className="ml-2 flex justify-center items-center h-10.25 w-10.25 rounded-[50%] border-[1.3px] bg-(--color-darker) border-white/15 "
        >
          <img src={icon1} alt={title} />
        </div>
      </div>
      <div>
        <h2 className="font-medium text-[16px] mt-3 mb-2 ">{title}</h2>
        <p className="font-medium text-[13px] opacity-50">{description}</p>
      </div>
    </div>
  );
};
export default SettingWrapper;
