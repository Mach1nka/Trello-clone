import { SliceName } from '../service/resources/models/common.model';

const generateActionTypeHelper =
  (sliceName: SliceName) =>
  (actonType: string): string =>
    `${sliceName}/${actonType}/fulfilled`;

export default generateActionTypeHelper;
