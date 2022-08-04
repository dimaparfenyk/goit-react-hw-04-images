import { BallTriangle } from 'react-loader-spinner'
import { Box } from './Loader.styled';

export const Loader = () => {
 
    return (
    <Box>
        <BallTriangle
            color="#3f51b5"
            height={80}
            width={80} />
    </Box>    
    );
}
         
