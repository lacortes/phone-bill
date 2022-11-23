import { Box, Container, Skeleton, Stack } from '@mui/material';


const LoadingStatement = () => {
    return (
        <div data-testid='loading-statement'>
            <Box mb={10}>
                <Skeleton variant="rectangular" height={70}/>
            </Box>

            <Container>
                <Box mb={4}>
                    <Skeleton variant="rectangular" height={60} width={350}/>
                </Box>
                <Stack gap={2}>
                    <Skeleton variant="rectangular" height={70}/>
                    <Skeleton variant="rectangular" height={70}/>
                    <Skeleton variant="rectangular" height={70}/>
                    <Skeleton variant="rectangular" height={70}/>
                    <Skeleton variant="rectangular" height={70}/>
                    <Skeleton variant="rectangular" height={70}/>
                </Stack>
            </Container>
        </div>
    );
};

export default LoadingStatement;