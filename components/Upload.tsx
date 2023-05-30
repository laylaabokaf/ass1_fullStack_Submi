
import { useRef, useState } from "react";


export type UploadProps = {
  file: File | undefined;
  setFile: Function
};

export const Upload: React.FC<{props: UploadProps}> = ({props}) => {
  const {file,setFile} = props;
  const [showSpinner, setShowSpinner] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [value,setValue] = useState("");
  const [removeButten, setRemoveButten] = useState(false);
  const inputRef = useRef(null); 


  const handleRemoveVedio = (event: any) => {
    if(inputRef!==null){
      event.preventDefault();  
      inputRef.current.value = null
       setFile("");
    }  
  };

  const uploadVedio = (event:any) =>{
    const file = event.target.files[0];
    setFile(file);
  };
  
   return (
    <div>

      <label
        className={`mx-auto w-64 text-black items-center p-4 m-5 bg-white rounded-lg shadow-2xl tracking-wide uppercase border border-yellow-500 cursor-pointer hover:bg-yellow-200 ${
          showSpinner || showVideo ? "hidden" : "flex flex-col"
        }`}
      >
        <span className="mt-2 text-base text-black leading-normal">
          Select a video
        </span>
        <input ref={inputRef} type="file"   onChange={uploadVedio} className="hidden"  />
        <button onClick={handleRemoveVedio}>remove file</button>
      </label>
    </div>
  );
}

