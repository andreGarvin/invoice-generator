import { UseFormRegister } from "react-hook-form";
import { useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

import { InvoiceFormData } from "types/invoice";
import { getDataURL } from "lib/file";

import { Icon } from "components/ui/icons";
import Button from "components/ui/Button";
import { twJoin } from "tailwind-merge";

type AttachLogoProps = {
  register: UseFormRegister<InvoiceFormData>;
};

export function AttachLogo(props: AttachLogoProps) {
  const { register } = props;

  const fileRef = useRef<HTMLInputElement>(null);
  const [dataURL, setDataURL] = useState("");

  // assigns ref to the react hook form register and to fileRef
  const handleRef = (e) => {
    ref(e);

    // @ts-ignore
    fileRef.current = e;
  };

  const clearDataURL = () => {
    setDataURL("");
  }

  const handleClick = () => {
    fileRef.current?.click()
  }

  // displays image of the logo/image file that was chosen
  const handleOnChange = (e) => {
    const [file] = e.target.files;

    getDataURL(file)
      .then(url => {
        setDataURL(url);
      }).catch(err => {
        // TODO: add a error message display on the ui
        console.error(err);
      });
  }

  const { ref, ...rest } = register("logo", {
    onChange: handleOnChange
  });

  const fileUploadSection = (
    <div className={dataURL ? "hidden" : ""}>
      <input
        type="file"
        ref={handleRef}
        className="hidden"
        accept="image/png, image/jpeg"
        {...rest}
      />
      <span className="flex flex-row pb-1">
        <p className="capitalize text-sm italic text-gray-600 mr-2">
          attach your company logo
        </p>
        <Icon as="Info" className="text-gray-600 attach-logo-info" />
        <Tooltip
          place="top"
          anchorSelect=".attach-logo-info"
          className="first-letter:capitalize"
        >
          only jpeg & png files
        </Tooltip>
      </span>
      <Button
        onClick={handleClick}
        className="bg-white border border-gray-300  w-80 flex justify-center text-2xl text-gray-400 h-48"
      >
        <Icon as="Plus" />
      </Button>
    </div>
  );

  const Image = (
    <div
      className={twJoin(
        "flex justify-end items-start h-48",
        dataURL ? "" : "hidden"
      )}
    >
      <Button
        className="absolute bg-black/60 rounded-sm p-1 hover:bg-indigo-700/90"
        onClick={clearDataURL}
      >
        <Icon as="Close" className="h-5 w-5 fill-white" />
      </Button>
      <img
        src={dataURL}
        className="w-48 hover:cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-start">
      {fileUploadSection}
      {Image}
    </div>
  );
}
