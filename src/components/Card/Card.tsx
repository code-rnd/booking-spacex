import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card as AntCard, PageHeader, Image } from "antd";

import { useAppSelector } from "../../store";
import s from "./Card.module.scss";

const { Meta } = AntCard;

/** TODO: Для актуальности данных, карточку нужно фетчить ппри переходе в нее,
 *  так как апи не повзоляет осуществить весь CRUD, карточка передается через глобальное хранилище редакс */
export const Card: FC = () => {
  const card = useAppSelector((state) => state.launches.currentCard);
  const pending = useAppSelector((state) => state.launches.isLoading);
  const navigate = useNavigate();

  const { name, links } = card || {};

  return (
    <div className={s.container}>
      <PageHeader onBack={() => navigate(-1)} title={name} subTitle="/ Main" />
      <AntCard
        hoverable
        style={{ width: "250px" }}
        cover={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Image preview={false} width={250} src={links?.patch?.large} />
          </div>
        }
        loading={pending}
      >
        <Meta
          title="Youtube"
          description={"https://www.youtube.com/watch?v=" + links?.youtube_id}
        />
        <Meta title="Wikipedia" description={links?.wikipedia} />
        <Meta title="Presskit" description={links?.presskit} />
        <Meta title="Webcast" description={links?.webcast} />
        <Meta title="Article" description={links?.article} />
      </AntCard>
    </div>
  );
};
