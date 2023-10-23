import { FaCalendarAlt, FaHashtag, FaPlus, FaGithub, FaTrashAlt } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { HiDownload } from "react-icons/hi";

const Icons = {
  OpenInNewTab: MdOpenInNew,
  Calendar: FaCalendarAlt,
  Download: HiDownload,
  HashTag: FaHashtag,
  Trash: FaTrashAlt,
  Github: FaGithub,
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
