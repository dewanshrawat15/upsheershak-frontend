import './App.css';
import { useState } from 'react';

import FileManagerDashboard from "./components/FileManagerDashboard";
import FileProcessingView from "./components/FileProcessingView";
import { AppState } from './utils/constants';
import FileUploader from './components/FileUploader';
import { ChakraProvider } from '@chakra-ui/react';

const BaseEL = (props) => {
  const {appState, fileKey, fileResult, updateFileKey, processFileResult} = props;
  switch (appState) {
    case AppState.INIT:
      return <FileUploader updateFileKey={updateFileKey} />
    case AppState.PROCESSING:
      return <FileProcessingView processFileResult={processFileResult} fileKey={fileKey} />
    case AppState.PROCESSED:
      return <FileManagerDashboard result={fileResult} />
    default:
      return <></>
  }
}

function App() {

  const [appState, updateAppState] = useState(AppState.PROCESSING);
  const [fileKey, updateFileKey] = useState("BWPH434S");
  const [fileResult, updateFileResult] = useState({});

  const processFileKey = (key) => {
    updateFileKey(key);
    updateAppState(AppState.PROCESSING);
  }

  const processFileResult = (result) => {
    updateFileResult(result);
    updateAppState(AppState.PROCESSED);
  }

  // const baseEl = getEl(appState, fileKey, updateFileKey);
  return <ChakraProvider>
    <BaseEL
      appState={appState}
      fileKey={fileKey}
      updateFileKey={processFileKey}
      processFileResult={processFileResult}
      fileResult={fileResult}
    />
  </ChakraProvider>
}

export default App;
