import React from 'react';
import { Button, ButtonProps, Group } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';

import { TwitterIcon } from './TwitterIcon';

export function GoogleButton(props) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}




// Twitter button as anchor
export function TwitterButton(props) {
  return <Button component="a" leftIcon={<TwitterIcon />} variant="default" {...props} />;
}

