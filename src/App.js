import './App.css'
import sheikahTopSlate from '../src/imgs/sheika-slate-top.png'
import sheikahBottomSlate from '../src/imgs/sheika-slate-bottom.png'
import { MainMap } from './components/MainMap'

function App() {
  return (
    <div>
      <MainMap />
      <img className='overlay' src={sheikahTopSlate} />
      <img className='overlay' src={sheikahBottomSlate} style={{ bottom: 0 }} />
    </div>
  );
}

export default App;
