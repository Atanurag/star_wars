import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Button, Center, Stack, Container, Box } from '@mantine/core';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase';

const Login: FC = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                const token = user.accessToken || '';
                const name = user.displayName || 'Unknown User';
                const photo = user.photoURL || '';

                localStorage.setItem('token', token);
                localStorage.setItem('email', name);
                localStorage.setItem('img_url', photo);

                navigate('/home');
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <Box
            style={{
                backgroundImage:
                    'url("https://www.pixelstalk.net/wp-content/uploads/images6/Star-Wars-Space-Background-HD.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <Container size="xs" style={{ height: '100vh' }}>
                <Center style={{ height: '100%' }}>
                    <Stack spacing="xl" align="center" w="100%" style={{ color: 'white' }}>
                        <Title
                            order={1}
                            ta="center"
                            sx={{
                                color: '#FFE81F',
                                textShadow: '2px 2px 4px #000000',
                            }}
                        >
                            Welcome to Star Wars
                        </Title>

                        <Button
                            variant="white"
                            fullWidth
                            size="md"
                            onClick={handleGoogleLogin}
                            aria-label="Login with Google"
                        >
                            Continue with Google
                        </Button>
                    </Stack>
                </Center>
            </Container>
        </Box>
    );
};

export default Login;
