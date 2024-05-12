import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "firebase/storage";
import LinearWithValueLabel from "ui-component/LinearProgressWithLabel";
import { useRef, useState } from "react";
import { CardMedia } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload = (params) => {
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const inputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            setProgress(progress);
          },
          (error) => {
            console.error("Upload failed:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            params.setDownloadURL(downloadURL);
            setDownloadURL(downloadURL);
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setProgress(0);
      setDownloadURL("");
    }
  };

  if(params.setResetFunction)
  params.setResetFunction(resetInput);

  return (
    <label>
      <div className="ml-2">
        {progress > 0 && progress != 100 && (
          <LinearWithValueLabel progress={progress} />
        )}
      </div>
      {(progress === 100 && params.type ==="image" && downloadURL  ) && (
        <CardMedia component="img" className="my-4 rounded-[10px] drop-shadow-md " image={downloadURL} />
      )}
      {(progress === 100 && params.type ==="video" && downloadURL ) && (
        <CardMedia component="video" className="my-4 rounded-[10px] drop-shadow-md " controls src={downloadURL} />
      )}

      {( progress === 0 || !params.reset ) && (
        <>
          <Button
            component="span"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className={params.className}
          >
            {params.text}
          </Button>
          <VisuallyHiddenInput type="file" ref={inputRef} onChange={handleFileChange} />
        </>
      )}


    </label>
  );
}

export default InputFileUpload;