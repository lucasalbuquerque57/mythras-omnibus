import {currentUser} from '@/lib/auth';

const AdminPage = async () => {
    const user = await currentUser();

    return (
        <div>
          {JSON.stringify(user)}
        </div>
    );
};

export default AdminPage;
