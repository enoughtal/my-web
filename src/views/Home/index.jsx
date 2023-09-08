import { useNavigate } from 'react-router-dom';
import './index.sass';
import universe1000w from './universe-1000w.jpg';
import universe600w from './universe-600w.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="myapp-home">
      <div className="myapp-home-picture none-user-select">
        <img
          src={universe1000w}
          alt="universe"
          height={300}
          sizes="(max-width: 800px) 600px, 1000px"
          srcSet={`${universe1000w} 1000w, ${universe600w} 600w`}
        />
      </div>

      <div className="myapp-home-poem">
        <pre>
          {`I don't need anyone to keep me company
When the Universe is with me at all times
Paying attention
Keeping me accountable
Being present
When I feel lonely inside.`}
        </pre>
        <span>Written by Jammit Janet</span>
      </div>

      <div className="myapp-home-navigation">
        <div
          className="myapp-home-navigation-entry"
          onClick={() => navigate('/blog')}
        >
          Blog
        </div>
        <div
          className="myapp-home-navigation-entry"
          onClick={() => navigate('/todos')}
        >
          TO DO
        </div>
        <div
          className="myapp-home-navigation-entry"
          onClick={() => navigate('/tictactoe')}
        >
          Tic Tac Toe
        </div>
        <div
          className="myapp-home-navigation-entry"
          onClick={() => navigate('/about')}
        >
          About
        </div>
      </div>
    </div>
  );
}
