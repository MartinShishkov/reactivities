import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import ImageUploadCropper from './ImageUploadCropper';

type ImageUploadWidgetProps = {
  loading: boolean;
  uploadImage: (file: Blob) => void;
};

const ImageUploadWidget: React.FC<ImageUploadWidgetProps> = ({ loading, uploadImage }) => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }
  }, [files]);

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => uploadImage(blob!));
    }
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Add Image'/>
        <ImageUploadDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize Image'/>
        {files && files.length > 0 && (
          <ImageUploadCropper setCropper={setCropper} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Preview and Upload'/>
        {files && files.length > 0 && (
          <>
            <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
            <Button.Group widths={2}>
              <Button loading={loading} positive icon='check' onClick={onCrop} />
              <Button disabled={loading} icon='close' onClick={() => setFiles([])} />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
export default ImageUploadWidget;