import './App.css';
import { useState } from 'react';

import FileManagerDashboard from "./components/FileManagerDashboard";
import FileProcessingView from "./components/FileProcessingView";
import { AppState } from './utils/constants';
import FileUploader from './components/FileUploader';
import { ChakraProvider } from '@chakra-ui/react';

const BaseEL = (props) => {
  const {appState, fileKey, updateFileKey} = props;
  switch (appState) {
    case AppState.INIT:
      return <FileUploader updateFileKey={updateFileKey} />
    case AppState.PROCESSING:
      return <FileProcessingView fileKey={fileKey} />
    case AppState.PROCESSED:
      return <></>
    default:
      return <></>
  }
}

function App() {

  const [appState, updateAppState] = useState(AppState.INIT);
  const [fileKey, updateFileKey] = useState("");

  const processFileKey = (key) => {
    updateFileKey(key);
    updateAppState(AppState.PROCESSING);
  }

  // const baseEl = getEl(appState, fileKey, updateFileKey);
  return <ChakraProvider>
    <BaseEL appState={appState} fileKey={fileKey} updateFileKey={processFileKey} />
  </ChakraProvider>
}

export default App;
