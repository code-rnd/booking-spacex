import { LaunchDto, LaunchModel } from "./models";
import { getStatusRndGen } from "./sliceLaunches.utils";

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
