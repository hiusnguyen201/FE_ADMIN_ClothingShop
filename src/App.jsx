import { Router } from '@/routes';
import { CreateUserDialogProvider } from './pages/admin/users/create-user-dialog';

function App() {
  return (
    <CreateUserDialogProvider>
      <Router />
    </CreateUserDialogProvider>
  );
}

export default App;
