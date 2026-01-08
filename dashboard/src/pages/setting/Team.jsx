import { useState } from "react";
import Search from "../../Component/Search";
import group from "../../../Icons/group.svg";
import add from "../../../Icons/add.svg";
import TeamModel from "./TeamModel";
//  ${index % 2 !== 0 ? "bg-[var(--color-darker)]" : ""}

const Team = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h6 className="font-secondary font-bold text-[40px] mt-6">
        Team Management
      </h6>
      <div className="flex justify-between mr-8 mt-6 items-center">
        <Search />
        <div className="relative">
          <button
            onClick={() => setOpen(true)}
            className="w-48.25 h-13.75 rounded-[15px] bg-(--color-primary) flex justify-center items-center"
          >
            <img src={add} className="h-6 w-6" />{" "}
            <span className="text-[16px] ml-1.5">Add Member</span>
          </button>
          {open && <TeamModel isOpen={open} onClose={() => setOpen(false)} />}
        </div>
      </div>
      <div className="mt-12 border border-white/15 rounded-[15px] w-3/4 ">
        <div className="text-[16px] flex py-5 px-2 items-center border-b border-b-white/15">
          Team
        </div>
        <div className="text-[13px] font-medium">
          <table className="border-collapse border-spacing-y-3 w-full">
            <thead>
              <tr className="border-b border-b-white/15">
                <th className=" px-4 py-3">
                  <div className="flex items-center gap-1">
                    Name
                    <img src={group} className="w-2 h-4" />
                  </div>
                </th>
                <th className=" px-4 py-3">
                  <div className="flex items-center gap-1">
                    Email
                    <img src={group} className="w-2 h-4" />
                  </div>
                </th>
                <th className=" px-4 py-3">
                  <div className="flex items-center gap-1">
                    Role
                    <img src={group} className="w-2 h-4" />
                  </div>
                </th>
                <th className=" px-4 py-3">
                  <div className="flex items-center gap-1">
                    Action
                    <img src={group} className="w-2 h-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={`border-b border-b-white/15 text-[13px] font-medium `}
              >
                <td className="px-4 py-3 flex items-center gap-2 ">
                  <img src="" alt="" className="w-6 h-6 rounded-full" />
                </td>
                <td className="px-4 py-3">Email</td>
                <td className="px-4 py-3">Role</td>
                <td className="px-4 py-3">
                  <button>
                    <svg
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8743 9.00004C14.6865 9.00004 14.5063 9.07467 14.3735 9.2075C14.2406 9.34034 14.166 9.52051 14.166 9.70837V13.9584C14.166 14.1462 14.0914 14.3264 13.9585 14.4592C13.8257 14.5921 13.6455 14.6667 13.4577 14.6667H3.54102C3.35315 14.6667 3.17299 14.5921 3.04015 14.4592C2.90731 14.3264 2.83268 14.1462 2.83268 13.9584V4.0417C2.83268 3.85384 2.90731 3.67368 3.04015 3.54084C3.17299 3.408 3.35315 3.33337 3.54102 3.33337H7.79102C7.97888 3.33337 8.15904 3.25874 8.29188 3.12591C8.42472 2.99307 8.49935 2.8129 8.49935 2.62504C8.49935 2.43718 8.42472 2.25701 8.29188 2.12417C8.15904 1.99133 7.97888 1.9167 7.79102 1.9167H3.54102C2.97743 1.9167 2.43693 2.14059 2.03841 2.5391C1.6399 2.93762 1.41602 3.47812 1.41602 4.0417V13.9584C1.41602 14.522 1.6399 15.0625 2.03841 15.461C2.43693 15.8595 2.97743 16.0834 3.54102 16.0834H13.4577C14.0213 16.0834 14.5618 15.8595 14.9603 15.461C15.3588 15.0625 15.5827 14.522 15.5827 13.9584V9.70837C15.5827 9.52051 15.5081 9.34034 15.3752 9.2075C15.2424 9.07467 15.0622 9.00004 14.8743 9.00004ZM4.24935 9.53837V12.5417C4.24935 12.7296 4.32398 12.9097 4.45682 13.0426C4.58965 13.1754 4.76982 13.25 4.95768 13.25H7.96102C8.05424 13.2506 8.14665 13.2327 8.23295 13.1975C8.31925 13.1622 8.39775 13.1103 8.46393 13.0446L13.3656 8.13587L15.3773 6.1667C15.4437 6.10086 15.4964 6.02251 15.5323 5.9362C15.5683 5.84988 15.5868 5.7573 15.5868 5.66379C15.5868 5.57028 15.5683 5.4777 15.5323 5.39138C15.4964 5.30506 15.4437 5.22672 15.3773 5.16087L12.3739 2.12212C12.3081 2.05573 12.2297 2.00303 12.1434 1.96707C12.0571 1.93111 11.9645 1.9126 11.871 1.9126C11.7775 1.9126 11.6849 1.93111 11.5986 1.96707C11.5123 2.00303 11.4339 2.05573 11.3681 2.12212L9.3706 4.1267L4.45477 9.03545C4.38912 9.10164 4.33718 9.18014 4.30193 9.26644C4.26668 9.35274 4.24881 9.44515 4.24935 9.53837ZM11.871 3.62379L13.8756 5.62837L12.8698 6.6342L10.8652 4.62962L11.871 3.62379ZM5.66602 9.82879L9.86643 5.62837L11.871 7.63295L7.6706 11.8334H5.66602V9.82879Z"
                        fill="#F24822"
                      />
                    </svg>
                  </button>
                  <button>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M5.54102 16.625C5.1056 16.625 4.73299 16.4701 4.42318 16.1603C4.11338 15.8505 3.95821 15.4776 3.95768 15.0417V4.75H3.16602V3.16667H7.12435V2.375H11.8743V3.16667H15.8327V4.75H15.041V15.0417C15.041 15.4771 14.8861 15.85 14.5763 16.1603C14.2665 16.4706 13.8936 16.6255 13.4577 16.625H5.54102ZM13.4577 4.75H5.54102V15.0417H13.4577V4.75ZM7.12435 13.4583H8.70768V6.33333H7.12435V13.4583ZM10.291 13.4583H11.8743V6.33333H10.291V13.4583Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Team;
