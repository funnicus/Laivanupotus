import Board from './Board';

const BattleshipBoards = props => {
  
    return (
      <div className="BattleshipBoards" style={{ width: '90%', margin: 'auto', display: 'flex' }}>
          <Board {...props} />
          <Board {...props} />
      </div>
      );
  };
  
  export default BattleshipBoards;