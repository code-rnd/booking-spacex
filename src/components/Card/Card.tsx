import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrentCard } from "./Card.hooks";

export const Card: FC = () => {
  const [card, pending] = useCurrentCard();
  const navigate = useNavigate();

  return (
    <div>
      <div>{pending && !!card ? "loader" : <div>{card?.name}</div>}</div>
      <div onClick={() => navigate(-1)}>go back</div>
    </div>
  );
};
