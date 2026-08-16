import React from "react";

const NotificationBadge = ({ count }) => {
  if (!count || count <= 0) {
    return null;
  }

  return (
    <span
      className="
        absolute
        top-0
        right-0
        min-w-4.5
        h-4.5
        px-1
        flex
        items-center
        justify-center
        rounded-full
        bg-red-500
        text-white
        text-[10px]
        font-bold
        leading-none
        border-2
        border-white
      "
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default NotificationBadge;