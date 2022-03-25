import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect, ChangeEvent } from "react";

type imageUploadProps = {
  id: string;
  name: string;
  initValue?: string;
  onChange: {
    (e: ChangeEvent<any>): void;
    <T_1 = any>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: any) => void;
  };
  value: string | Blob | undefined;
};

const ImageUpload = ({
  id,
  name,
  initValue,
  onChange,
  value,
}: imageUploadProps) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
  const [hovered, setHovered] = useState<Boolean>();

  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current!.click();
  };

  const pickedHandler = (event: any) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    } else {
      setPreviewUrl(null);
    }
    onChange(pickedFile);
  };
  return (
    <div
      className="relative"
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {hovered && initValue && (
        <FontAwesomeIcon
          icon={faEdit}
          className={`hover:text-green-600 text-gray-700 text-2xl hover:cursor-pointer absolute top-0 right-0`}
          onClick={pickImageHandler}
        />
      )}
      <input
        ref={filePickerRef}
        id={id}
        className="hidden"
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div
        className={`h-32 w-32 box-boarder rounded-full grid border-2 mb-2 justify-center ${
          !initValue ? "cursor-pointer" : ""
        }`}
        onClick={!initValue ? pickImageHandler : undefined}
      >
        {previewUrl || initValue ? (
          <img
            src={
              previewUrl
                ? previewUrl.toString()
                : initValue
                ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/${initValue}`
                : undefined
            }
            alt="Preview"
            className="rounded-full self-center"
            style={{
              width: "7rem",
              height: "7rem",
              objectFit: "cover",
            }}
          />
        ) : (
          <p className="text-center self-center mt-2">Please pick an image</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
