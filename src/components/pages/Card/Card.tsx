import { FC } from "react";
import { Card as AntCard, Image, Descriptions } from "antd";

import { useAppSelector } from "../../../store";
import s from "./Card.module.scss";

/** TODO: Для актуальности данных, карточку нужно фетчить при переходе в нее,
 *  так как апи не повзоляет осуществить весь CRUD, карточка передается через глобальное хранилище редакс */
export const Card: FC = () => {
  const card = useAppSelector((state) => state.launches.currentCard);
  const isLoading = useAppSelector((state) => state.launches.isLoading);

  const { name, links } = card || {};
  const { wikipedia, presskit, webcast, article } = links || {};

  return (
    <div className={s.container}>
      <AntCard type="inner" title={name} loading={isLoading}>
        <Image preview={false} width={250} src={links?.patch?.small} />
        <Descriptions title={name}>
          <Descriptions.Item label="Youtube">
            <a href={"https://www.youtube.com/watch?v=" + links?.youtube_id}>
              Youtube
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Wikipedia">
            <a href={wikipedia || "#"}>Wikipedia</a>
          </Descriptions.Item>
          <Descriptions.Item label="Presskit">
            <a href={presskit || "#"}>Presskit</a>
          </Descriptions.Item>
          <Descriptions.Item label="Webcast">
            <a href={webcast || "#"}>Webcast</a>
          </Descriptions.Item>
          <Descriptions.Item label="Article">
            <a href={article || "#"}>Article</a>
          </Descriptions.Item>
        </Descriptions>
      </AntCard>
    </div>
  );
};
