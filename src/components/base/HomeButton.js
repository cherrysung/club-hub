import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomeButton() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <Button size='small' onClick={goToHome} startIcon={<ArrowBack />}>
      Back Home
    </Button>
  );
}
