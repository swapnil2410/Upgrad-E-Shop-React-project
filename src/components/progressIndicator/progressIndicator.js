import { CircularProgress } from '@mui/material';
import './progressIndicator.css'

function ProgressIndicator() {
    return (
        <div className='progress-container'>
            <CircularProgress color='inherit'/>
        </div>
    );
}

export default ProgressIndicator;
