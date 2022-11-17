import { LaunchDto, LaunchModel } from "../models";
import { getStatusRndGen } from "../utils";

export function mapperLaunchDtoToLaunch(data: LaunchDto[]): LaunchModel[] {
  return data.map(({ id, name, details, links }) => ({
    id,
    name,
    description: details,
    links,
    status: getStatusRndGen(),
  }));
}
