import React from 'react';
import 'cropperjs/dist/cropper.min.css';
import { Cropper } from 'react-cropper';

type ImageUploadCropperProps = {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
};

const ImageUploadCropper: React.FC<ImageUploadCropperProps> = ({ imagePreview, setCropper }) => {
  
  return (
    <Cropper 
      src={imagePreview}
      initialAspectRatio={1}
      aspectRatio={1}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      style={{
        height: 200,
        width: '100%'
      }}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
}

export default ImageUploadCropper;