import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

type LoadingProps = {
  inverted?: boolean;
  content?: string;
};

const Loading:React.FC<LoadingProps> = ({ inverted = true, content = 'Loading...' }) => {
  
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
export default Loading;