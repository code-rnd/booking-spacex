import { LaunchDto, LaunchModel, LaunchStatuses } from "./sliceLaunches.model";

/** TODO: Вынести */

export const statuses: LaunchStatuses[] = ["past", "available", "booked"];
const getStatusRndGen = (max: number = 2, min: number = 0): LaunchStatuses => {
  let rnd = Math.floor(min + Math.random() * (max + 1 - min));
  return statuses[rnd];
};

export function mapperLaunchDtoToLaunch(
  data: LaunchDto[] | LaunchDto
): LaunchModel[] | LaunchModel {
  if (Array.isArray(data)) {
    return data.map(({ id, name, details, links }) => ({
      id,
      name,
      description: details,
      links,
      status: getStatusRndGen(),
    }));
  } else {
    const { id, name, details, links } = data;
    return {
      id,
      name,
      description: details,
      links,
      status: getStatusRndGen(),
    };
  }
}
