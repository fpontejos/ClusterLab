import React from 'react';
import { setupIonicReact } from '@ionic/react';
import AppShell from './components/AppShell';

setupIonicReact();

const App: React.FC = () => <AppShell />;

export default App;