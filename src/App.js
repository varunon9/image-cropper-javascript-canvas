import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadProfilePicBottomSheet from './components/UploadProfilePicBottomsheet';
import Button from './components/Button';

function App() {
  const [
    selectedProfilePicFile,
    setSelectedProfilePicFile,
  ] = useState(null)
  const [uploadedImageDataUrl, setUploadedImageDataUrl] = useState(null);
  const selectProfileImageInputRef =
    useRef(null)

  const onUploadProfilePicAgainPress = () => {
    selectProfileImageInputRef.current?.click()
  }

  const onConfirmUploadProfileImage = (
    blob,
    dataUrl
  ) => {
    // send blob to BE for update, POST API
    // or use dataUrl to render directly in FE
    console.log(blob)
    setUploadedImageDataUrl(dataUrl);
    setSelectedProfilePicFile(null);
  }

  const onProfileImageInputChange =
    e => {
      const files = e.target?.files
      if (files?.length) {
        setSelectedProfilePicFile(files[0])
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={uploadedImageDataUrl || logo} alt="" />
        <Button text="Upload Image" variant='transparent' onClick={onUploadProfilePicAgainPress} addclassname="mt-4" />
        <input
          type="file"
          ref={selectProfileImageInputRef}
          onChange={onProfileImageInputChange}
          className="hidden"
          accept="image/*"
        />
      </header>
      {selectedProfilePicFile ? (
          <UploadProfilePicBottomSheet
            onClosePress={() =>
              setSelectedProfilePicFile(null)
            }
            selectedProfilePicFile={selectedProfilePicFile}
            onUploadAgainPress={
              onUploadProfilePicAgainPress
            }
            onConfirmUploadPress={
              onConfirmUploadProfileImage
            }
          />
        ) : null}
    </div>
  );
}

export default App;
