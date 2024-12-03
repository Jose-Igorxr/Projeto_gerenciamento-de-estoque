import './App.css'
import AppRouter from './Router'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App