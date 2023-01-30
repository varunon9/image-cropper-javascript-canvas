import {
    useRef,
    useEffect,
    useState,
  } from 'react'
  import PropTypes from 'prop-types';
import BottomsheetModal from './BottomsheetModal';
import Button from './Button';

  const CANVAS_WIDTH = 288
  
  const UploadProfilePicBotomSheet = (
    props
  ) => {
    const {
      onClosePress,
      selectedProfilePicFile,
      onUploadAgainPress,
      onConfirmUploadPress,
      uploadInPregress,
    } = props
  
    const lowerCanvasRef = useRef(null)
    const upperCanvasRef = useRef(null)
    const profileImageRef = useRef(new Image())
    const touchStartPosRef = useRef({ x: 0, y: 0 })
    const profileImageLastPosRef = useRef({ x: 0, y: 0 })
  
    const [previewObjectUrl, setPreviewObjectUrl] = useState(null)
  
    useEffect(() => {
      let objectUrl
      if (selectedProfilePicFile) {
        objectUrl = URL.createObjectURL(
          selectedProfilePicFile,
        )
        setPreviewObjectUrl(objectUrl)
      }
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl)
        }
      }
    }, [selectedProfilePicFile])
  
    const onImageDrag = (
      offsetX,
      offsetY,
    ) => {
      const lowerCanvas = lowerCanvasRef.current
      const upperCanvas = upperCanvasRef.current
      const profileImage = profileImageRef.current
      const profileImageLatestPos =
        profileImageLastPosRef.current
  
      if (
        lowerCanvas &&
        upperCanvas &&
        profileImage &&
        profileImageLatestPos
      ) {
        const lowerCanvasContext =
          lowerCanvas.getContext('2d')
        const upperCanvasContext =
          upperCanvas.getContext('2d')
  
        lowerCanvasContext?.clearRect(
          0,
          0,
          CANVAS_WIDTH,
          CANVAS_WIDTH,
        )
        upperCanvasContext?.clearRect(
          0,
          0,
          CANVAS_WIDTH,
          CANVAS_WIDTH,
        )
  
        const naturalWidth = profileImage.naturalWidth
        const naturalHeight = profileImage.naturalHeight
        const aspectRatio = naturalWidth / naturalHeight
  
        let newWidth, newHeight, newPosX, newPosY
  
        if (aspectRatio > 1) {
          newHeight = CANVAS_WIDTH
          newWidth = CANVAS_WIDTH * aspectRatio
        } else {
          newWidth = CANVAS_WIDTH
          newHeight = CANVAS_WIDTH / aspectRatio
        }
  
        if (aspectRatio === 1) {
          // image is already sqyare, don't allow drag
          newPosX = 0
          newPosY = 0
        } else if (aspectRatio > 1) {
          // width > height, only horizontal drag
          newPosX = profileImageLatestPos.x + offsetX
          newPosY = 0
        } else {
          // width < height, only vertical drag
          newPosX = 0
          newPosY = profileImageLatestPos.y + offsetY
        }
  
        lowerCanvasContext?.drawImage(
          profileImage,
          newPosX,
          newPosY,
          newWidth,
          newHeight,
        )
        upperCanvasContext?.drawImage(
          profileImage,
          newPosX,
          newPosY,
          newWidth,
          newHeight,
        )
      }
    }
  
    useEffect(() => {
      const profileImage = profileImageRef.current
      if (previewObjectUrl && profileImage) {
        profileImage.src = previewObjectUrl
      }
      profileImage.onload = () => {
        onImageDrag(0, 0)
      }
    }, [previewObjectUrl])
  
    const onCanvasContainerTouchStart =
      event => {
        const touchElement = event.touches[0]
        if (touchElement) {
          touchStartPosRef.current = {
            x: touchElement.clientX,
            y: touchElement.clientY,
          }
        }
      }
  
    const onCanvasContainerTouchMove =
      event => {
        const touchElement = event.touches[0]
        const touchStartPos = touchStartPosRef.current
        if (touchElement) {
          onImageDrag(
            touchElement.clientX - touchStartPos.x,
            touchElement.clientY - touchStartPos.y,
          )
        }
      }
  
    const onCanvasContainerTouchEnd =
      event => {
        const touchElement = event.changedTouches[0]
        const profileImageLatestPos =
          profileImageLastPosRef.current
        const touchStartPos = touchStartPosRef.current
        if (
          touchElement &&
          profileImageLatestPos &&
          touchStartPos
        ) {
          const offsetX =
            touchElement.clientX - touchStartPos.x
          const offsetY =
            touchElement.clientY - touchStartPos.y
  
          profileImageLatestPos.x =
            profileImageLatestPos.x + offsetX
          profileImageLatestPos.y =
            profileImageLatestPos.y + offsetY
        }
      }
  
    const onConfirmPress = () => {
      if (uploadInPregress) {
        return
      }
      const lowerCanvas = lowerCanvasRef.current
      lowerCanvas?.toBlob(blob => {
        if (blob) {
          onConfirmUploadPress(blob, lowerCanvas.toDataURL())
        }
      })
    }
  
    return (
      <BottomsheetModal>
        <div className="mt-5">
          <div className="flex flex-row flex-1 items-center w-full">
            <p
              level={2}
              className="flex-1 !font-normal text-xl"
            >
              Do you want to upload this photo?
            </p>
            <div
              className="flex items-center p-2"
              onClick={onClosePress}
            >
              <img
                src="/closeWhite.png"
                width="13"
                height="13"
                alt=""
              />
            </div>
          </div>
          <div className="my-3 w-full flex items-center justify-center relative">
            <div
              className="relative"
              style={{
                width: CANVAS_WIDTH,
                height: CANVAS_WIDTH,
              }}
              onTouchStart={onCanvasContainerTouchStart}
              onTouchMove={onCanvasContainerTouchMove}
              onTouchEnd={onCanvasContainerTouchEnd}
            >
              <canvas
                height={CANVAS_WIDTH}
                width={CANVAS_WIDTH}
                ref={lowerCanvasRef}
                className="rounded-lg"
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-brand-black opacity-50 rounded-lg" />
              <canvas
                height={CANVAS_WIDTH}
                width={CANVAS_WIDTH}
                ref={upperCanvasRef}
                className="absolute top-0 left-0 z-30 rounded-full border border-white"
              />
            </div>
          </div>
          <Button
            variant="solid"
            text="Confirm"
            addclassname="!w-full mt-4"
            onClick={onConfirmPress}
            size="large"
            isLoading={uploadInPregress}
          />
          <Button
            variant="transparent"
            text="Upload Again"
            addclassname="w-full mt-4"
            onClick={onUploadAgainPress}
          />
        </div>
      </BottomsheetModal>
    )
  }

  UploadProfilePicBotomSheet.propTypes = {
    onUploadAgainPress: PropTypes.func,
    selectedProfilePicFile: PropTypes.instanceOf(File),
    onClosePress: PropTypes.func,
    onConfirmUploadPress: PropTypes.func,
    uploadInPregress: PropTypes.bool
  }
  
  export default UploadProfilePicBotomSheet
  