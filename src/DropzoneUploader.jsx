import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const DropzoneUploader = ({ setImage }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "perros_preset"); // reemplazá por el nombre de tu preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dujyd1cei/image/upload",
        formData
      );
      console.log("Respuesta de Cloudinary:", response);
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      setImage(imageUrl); // Guardás la URL en tu estado global o local
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="p-3 border border-dashed rounded text-center bg-light"
      style={{ cursor: "pointer" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta la imagen aquí...</p>
      ) : (
        <p>Arrastrá y soltá la imagen aquí o hacé clic para seleccionarla.</p>
      )}
    </div>
  );
};

export default DropzoneUploader;
