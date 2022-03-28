import { useRecoilValue } from 'recoil';
import { _view } from './state';
import Random from './views/get-random/Random';
import People from './views/people/People';

function App() {
  const view = useRecoilValue(_view);

  if (view === "people") {
    return (
      <div className="app">
        <div className="wrapper">
          <People />
        </div>
      </div>
    )
  } else {
    return <Random />
  }
}

export default App
