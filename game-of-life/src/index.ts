import { createMain } from 'noliter';
import { GameOfLifeEngine } from './engine';

const engine = new GameOfLifeEngine([[]]);
const select = document.getElementById('patterns') as HTMLSelectElement;
const fetchLife = () =>
  fetch(`./patterns/${select.value}`)
    .then((res) => res.json())
    .then(({ life }) => {
      engine.stopLife();
      engine.setLife(life);
      engine.startLife();
    });

select.addEventListener('change', () => fetchLife());
document.body.appendChild(
  createMain((main) => {
    main.appendChild(engine.canvas);
    fetchLife();
  })
);
