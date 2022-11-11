import React, { FC } from "react";
import { Link } from "react-router-dom";

export const NotPage: FC = () => {
  return (
    <div>
      Not found 404, <Link to="/">home</Link>
    </div>
  );
};
