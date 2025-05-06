import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Flex, Group, Text } from '@mantine/core';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const UserProfile: FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('img_url');
          navigate('/login');
        } catch (error) {
          console.error('Sign-out error:', error);
        }
      };

  return (
    <Flex justify="space-between" align="center" p="md">
      <Group>
        <Avatar radius="xl" size="sm" src={localStorage.getItem('img_url')} />
        <Text>{localStorage.getItem('email')}</Text>
      </Group>
      <Button variant="outline" color="red" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default UserProfile;
