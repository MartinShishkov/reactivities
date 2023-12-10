import {FC, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

export interface Props {
  setFiles: (files: (File & { preview: string })[]) => void;
}

export const ImageUploadDropzone: FC<Props> = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles(acceptedFiles.map((file) => Object.assign(file, { 
      preview: URL.createObjectURL(file)
    })));
  }, [setFiles]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: 200
  };

  const dzActive = {
    borderColor: 'green'
  };

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  )
}