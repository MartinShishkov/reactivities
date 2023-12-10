import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { Profile, Image as ImageType } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ImageUploadWidget from '../../app/common/image-upload/ImageUploadWidget';

type ProfilePhotosProps = {
  profile: Profile;
};

const ProfilePhotos:React.FC<ProfilePhotosProps> = ({ profile }) => {
  const { profileStore } = useStore();
  const { uploadPhoto, isCurrentUser, uploading, loading, setMainImage, deleteImage, deleting } = profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState<boolean>(false);
  const [target, setTarget] = useState('');

  const handleImageUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  const handleSetMainImage = (image: ImageType, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    setMainImage(image).then(() => setTarget(''));
  };

  const handleDeleteImage = (image: ImageType, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deleteImage(image).then(() => setTarget(''));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos'/>
          {isCurrentUser && (
            <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add photo'} onClick={() => setAddPhotoMode(!addPhotoMode)}/>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <ImageUploadWidget uploadImage={handleImageUpload} loading={uploading} />
          ) : (
            <Card.Group>
              {profile.images?.map((image) => (
                <Card key={image.id}>
                  <Image src={image.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button 
                        name={`setmain-${image.id}`} 
                        loading={target === `setmain-${image.id}` && loading} 
                        disabled={image.isMain} 
                        basic 
                        color='green' 
                        content='Main' 
                        onClick={e => handleSetMainImage(image, e)}
                      />
                      <Button
                        name={`delete-${image.id}`}
                        loading={target === `delete-${image.id}` && deleting}
                        disabled={image.isMain}
                        basic 
                        color='red' 
                        icon='trash' 
                        onClick={e => handleDeleteImage(image, e)} 
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
export default observer(ProfilePhotos);