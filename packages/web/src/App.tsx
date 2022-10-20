import { AuthProvider } from './contexts/auth';
import { ToastProvider } from './contexts/toast';

import Routes from './routes';
function App() {
  return (
    <div className="App">
      <ToastProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
