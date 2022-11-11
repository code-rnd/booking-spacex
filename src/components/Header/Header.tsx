import { FC, useMemo } from "react";
import { PageHeader } from "antd";
import { Link, useLocation } from "react-router-dom";

export const Header: FC = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    if (pathname === "/") {
      return "Boards";
    }
    if (pathname.search("card")) {
      return (
        <Link to="/" title="Card" style={{ color: "black" }}>
          Boards / Card
        </Link>
      );
    }
  }, [pathname]);

  return <PageHeader title={title} />;
};
