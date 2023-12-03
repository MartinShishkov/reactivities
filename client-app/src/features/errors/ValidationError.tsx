import React from 'react';
import { Message, MessageItem } from 'semantic-ui-react';

type ValidationErrorProps = {
  errors: string[];
};

const ValidationError: React.FC<ValidationErrorProps> = ({ errors }) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((e, i) => <MessageItem key={`${e}-${i}`}>{e}</MessageItem>)}
        </Message.List>
      )}
    </Message>
  );
}

export default ValidationError;