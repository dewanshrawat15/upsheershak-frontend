import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import "./index.css";

export default function FileProcessingView(props){

    const { fileKey } = props;
    const [fileDetails, updateFileDetails] = useState({});
    const [fileResult, updateFileResult] = useState({});

    const toast = useToast();

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getFileResult = async () => {
        let myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const res = await fetch("http://localhost:8000/api/file/result/?key=" + fileKey, requestOptions);
        const fileResult = await res.json()
        console.info(fileResult);
        updateFileResult(fileResult);
    }

    const checkIfFileProcessingComplete = async () => {
        let myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const res = await fetch("http://localhost:8000/api/file/status/?key=" + fileKey, requestOptions);
        const statusResult = await res.json()
        if(statusResult.status){
            getFileResult();
        } else {
            await timeout(2000);
            checkIfFileProcessingComplete();
        }
    }

    const trigerrProcessing = () => {
        let myHeaders = new Headers();
        myHeaders.append("accept", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch("http://localhost:8000/api/file/transcribe/?key=" + fileKey, requestOptions)
        .then(response => response.json())
        .then(result => {
            checkIfFileProcessingComplete();
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {

        const getDataForFileKey = () => {
            let myHeaders = new Headers();
            myHeaders.append("accept", "application/json");

            let requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            fetch("http://localhost:8000/api/file/details/?key=" + fileKey, requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                updateFileDetails(result);
                await timeout(5000);
                toast({
                    title: 'Starting file processing',
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                });
                trigerrProcessing();
            })
            .catch(error => console.log('error', error));
        }

        getDataForFileKey();
    }, [])

    return <div className="file-processing-view">
        {fileDetails ? fileDetails.file ? <video src={fileDetails.file} width="400" /> : <></> : <></>}
    </div>
}