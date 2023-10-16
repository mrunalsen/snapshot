import { useLocation } from 'react-router-dom';
import './App.scss';
import Header from './app/core/components/navigation/Header';
import Routing from './app/core/components/navigation/Routing';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const showHeader = currentPath !== '/' && currentPath !== '/signup';

  return (
    <>
      <div className='flex flex-col h-full'>
        {/* Start : Header */}
        {showHeader && <Header />}
        {/* End : Header */}
        {/* Start : Main Routing */}
        <div className="bg-body overflow-auto h-full">
          <Routing />
        </div>
        {/* End : Main Routing */}
      </div>
    </>
  );
}

export default App;