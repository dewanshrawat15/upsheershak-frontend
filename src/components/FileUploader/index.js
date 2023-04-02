import { useToast } from "@chakra-ui/react";
import "./index.css";
import { useRef, useState } from "react";

export default function FileUploader(props){

    const [selectedFile, uploadSelectedFile] = useState(null);
    const [langCodes, updateLangCodes] = useState("en");
    const inputFile = useRef(null);
    const toast = useToast();

    const { updateFileKey } = props;

    const handleClick = () => {
        inputFile.current.click()
    }

    const processAPI = (file, languages) => {
        let myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        let formdata = new FormData();
        formdata.append("file", file);
        formdata.append("lang_codes", languages);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        toast({
            title: 'Uploading file',
            description: "File upload in progress, please wait",
            status: 'info',
            duration: 3000,
            isClosable: true,
        });

        fetch("http://54.71.158.103:8000/api/file/upload/", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.key){
                toast({
                    title: 'Success',
                    description: result.message,
                    status: 'success',
                    duration: 1200,
                    isClosable: true,
                });
                updateFileKey(result.key);
            }
        })
        .catch(error => console.log('error', error));
    }

    const handleFileChange = (e) => {
        if(e.target.files){
            if(e.target.files.length > 0){
                uploadSelectedFile(e.target.files[0]);
            }
        }
    }

    const uploadFile = () => {
        const langCodeEl = document.querySelector("#lang-codes");
        if(langCodeEl.value){
            if(langCodeEl.value.length > 0){
                updateLangCodes(langCodeEl.value);
                processAPI(selectedFile, langCodeEl.value);
            }
        }
    }

    return <div className="file-uploader-dashboard">
        <div className="file-uploader-box" onClick={handleClick}>
            {selectedFile ? selectedFile.name : <span>
                Click <span style={{ textDecoration: 'underline' }}>here</span> to upload file
            </span>}
            <input accept=".mp4" ref={inputFile} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
        <br /><br />
        {selectedFile ? <>
            <div className="languages">
                <p>
                    Please enter language codes seperated by comma. Some examples would be en for English, ja for Japanese, hi for hindi
                </p>
                <br />
                <input type="text" id="lang-codes" placeholder="Enter language codes" />
            </div>
            <br /><br />
            <div className="file-upload-bttns-row">
                <span className="upload-file" onClick={uploadFile}>
                    Upload
                </span>
            </div>
        </> : <></>}
    </div>
}