import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/authProvider';
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

function ProfileButton() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const goToProfile = () => {
    if (!auth) return;
    navigate('/profile');
  };

  return (
    <IconButton
      color='primary'
      aria-label='go to profile page'
      onClick={goToProfile}
    >
      <AccountCircle />
    </IconButton>
  );
}

export default ProfileButton;
