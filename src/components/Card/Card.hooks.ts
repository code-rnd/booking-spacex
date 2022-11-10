import { useCallback, useEffect, useState } from "react";

import { ApiLaunches, LaunchModel } from "../../store";
import { useParams } from "react-router-dom";

export const useCurrentCard = (): [LaunchModel | undefined, boolean] => {
  const { id } = useParams<{ id: string }>();

  const [pending, setPending] = useState(false);
  const [card, setCard] = useState<LaunchModel>();

  const fetch = useCallback(async () => {
    if (!id) return;

    setPending(true);
    try {
      const { data } = await ApiLaunches.getLaunch(id);
      setCard(data);
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [id]);

  return [card, pending];
};
