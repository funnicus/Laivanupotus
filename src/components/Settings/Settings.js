const Settings = ({ game }) => {
  const { shipAmounts, player1Name, player2Name } = game.G;
  const gridSize = game.G.boards[0].length;

  const setPlayer1Name = (e) => game.moves.setPlayerNames(1, e.target.value);
  const setPlayer2Name = (e) => game.moves.setPlayerNames(2, e.target.value);

  const setGridSize = (e) => game.moves.setBoardSize(parseInt(e.target.value));

  const setCarriers = (e) =>
    game.moves.setShipAmounts({
      ...shipAmounts,
      carriers: parseInt(e.target.value),
    });

  const setBattleships = (e) =>
    game.moves.setShipAmounts({
      ...shipAmounts,
      battleships: parseInt(e.target.value),
    });

  const setCruisers = (e) =>
    game.moves.setShipAmounts({
      ...shipAmounts,
      cruisers: parseInt(e.target.value),
    });

  const setSubmarines = (e) =>
    game.moves.setShipAmounts({
      ...shipAmounts,
      submarines: parseInt(e.target.value),
    });

  const setDestroyers = (e) =>
    game.moves.setShipAmounts({
      ...shipAmounts,
      destroyers: parseInt(e.target.value),
    });

  return (
    <div>
      <label htmlFor="player1Name">Pelaajan 1 nimi: </label>
      <input
        type="text"
        id="player1Name"
        value={player1Name}
        onChange={setPlayer1Name}
      />
      <label htmlFor="player2Name">Pelaajan 2 nimi: </label>
      <input
        type="text"
        id="player2Name"
        value={player2Name}
        onChange={setPlayer2Name}
      />
      <label htmlFor="gridSize">Pelilaudan koko (5-10): </label>
      <input
        type="number"
        id="gridSize"
        min="5"
        max="10"
        value={gridSize}
        onChange={setGridSize}
      />
      <label htmlFor="carriers">Lentotukialusten määrä: </label>
      <input
        type="number"
        id="carriers"
        min="0"
        value={shipAmounts.carriers}
        onChange={setCarriers}
      />
      <label htmlFor="battleships">Taistelulaivojen määrä: </label>
      <input
        type="number"
        id="battleships"
        min="0"
        value={shipAmounts.battleships}
        onChange={setBattleships}
      />
      <label htmlFor="cruisers">Risteilijöiden määrä: </label>
      <input
        type="number"
        id="cruisers"
        min="0"
        value={shipAmounts.cruisers}
        onChange={setCruisers}
      />
      <label htmlFor="submarines">Sukellusveneiden määrä: </label>
      <input
        type="number"
        id="submarines"
        min="0"
        value={shipAmounts.submarines}
        onChange={setSubmarines}
      />
      <label htmlFor="destroyers">Hävittäjien määrä: </label>
      <input
        type="number"
        id="destroyers"
        min="0"
        value={shipAmounts.destroyers}
        onChange={setDestroyers}
      />
      <button onClick={() => game.events.endPhase()}>Valmis</button>
    </div>
  );
};

export default Settings;

/*
const settings = {
  player1: "",
  player2: "",
  size: 5,
  ships: {
    carriers: 1,
    battleships: 1,
    cruisers: 1,
    submarines: 1,
    destroyers: 1,
  },
};
*/
