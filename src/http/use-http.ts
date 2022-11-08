import axios from "axios";

export const useHttp = () => {
  /** Получаю данные */
  const get = (url: string, config?: any) => {
    return axios.get(url, config);
  };

  /** Создаю ресурс */
  const post = (url: string, data?: any, config?: any) => {
    return axios.post(url, data, config);
  };

  /** Редактирую ресурс */
  const patch = (url: string, data?: any, config?: any) => {
    return axios.patch(url, data, config);
  };

  /** Перезаписываю ресурс (заменяю его полностью) */
  const put = (url: string, data?: any, config?: any) => {
    return axios.put(url, data, config);
  };

  /** Удаляю ресурс */
  const delete_ = (url: string, config?: any) => {
    return axios.delete(url, config);
  };

  return { get, post, patch, delete_ };
};
