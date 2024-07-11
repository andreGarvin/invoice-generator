import {
  FaPlus,
  FaGithub,
  FaHashtag,
  FaTrashAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { HiDownload, HiInformationCircle } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Icons = {
  OpenInNewTab: MdOpenInNew,
  Info: HiInformationCircle,
  Calendar: FaCalendarAlt,
  Download: HiDownload,
  HashTag: FaHashtag,
  Trash: FaTrashAlt,
  Github: FaGithub,
  Close: IoMdClose,
  Plus: FaPlus,
};

export type IconType = keyof typeof Icons;

type IconProps = {
  className?: string;
  as: IconType;
};

export const Icon: React.FC<IconProps> = (props) => {
  const { as, className } = props;

  const IconComponent = Icons[as];
  return <IconComponent className={className} />;
};
