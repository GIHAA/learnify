import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

const Admin = () => {
    const { user } = useContext(AuthContext);
 
    return (
      <div>
        <h1>Admin Page {user?.email}</h1>
      </div>
    );
}

export default Admin