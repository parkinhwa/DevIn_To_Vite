import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProfileUpdateForm, NavTemplate } from '@@/components';

export function ProfileUpdate() {
  const { fullName, image } = useSelector(state => state.user.user);

  const [name, setName] = useState(fullName || null);

  useEffect(() => {
    if (fullName) {
      setName(fullName);
    }
  }, [fullName]);

  if (!name) return <div>null</div>;

  return (
    <NavTemplate>
      <ProfileUpdateForm fullName={name} image={image || false} />
    </NavTemplate>
  );
}
