import React, {useState, useEffect} from 'react';
import uploadService from '../services/uploadService';
import Specifier from './Specifier';


const UploadPage = () => {

  const [isLoaded, setStatus] = useState(false);
  const [Undefined, setUndefined] = useState([]);
  const [file, setFile] = useState(null);
  const tags = {};

  const onFileChange = (event) => {
      setFile(event.target.files[0])
  }

  const onFileUpload = async (event) => {
    event.preventDefault()
    const resp = await uploadService.uploadCSV(file);
    await setUndefined(resp.data);
    console.log(resp.data.length)
    if(resp.data.length > 1) {
      setStatus(true);
      console.log(Undefined)
    }
  }
  const handleClick = async () => {
    const formData = new FormData();
    Object.keys(tags).forEach(key => formData.append(key, tags[key]));
    const tag = await uploadService.uploadTags(formData);
    if(tag){
      setStatus(false)
      Undefined.shift();
      console.log(Undefined);
      await uploadService.uploadTransactions(Undefined);
    }else{

    }
  }
   
      
  return(
      <>
      {!isLoaded
      ? 
      <form onSubmit={onFileUpload}>
        <div class="form-group">
          <input type="file" class="form-control-file" onChange={onFileChange} id="myFile" name="filename"/>
          <input type="submit" class="btn btn-primary" />
        </div>
      </form>
      :
      <div className="text-center">
      <h3>Ladattu...</h3>
      <Specifier Undefined={Undefined}  tags={tags}/>
      <button class="btn btn-primary" onClick={handleClick}>submit</button>
      </div>
      }
      </>
   );
}


export default UploadPage;