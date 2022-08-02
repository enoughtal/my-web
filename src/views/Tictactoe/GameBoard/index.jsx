import GameHistory from './GameHistory/index.jsx'
import './index.sass'

export default function GameBoard({
    active, snapshot, dropPiece, currentStep, goToStep, winCoordinates
}) {
    const drawPiece = (order) => {
        switch (order) {
            case 1: return '⚔️'
            case 2: return '🛡️'
            default: return ''
        }
    }

    //根据Game类里的快照渲染棋盘格子
    const board =
        snapshot.map((row, x) => {
            return (
                <div className='myapp-comp-tictactoe-board-row'
                    key={x}
                >
                    {row.map((square, y) => {
                        let className = 'none-user-select'
                        let isWinSquare = false
                        for (const [coordX, coordY] of winCoordinates) {
                            if (coordX === x && coordY === y) {
                                isWinSquare = true
                                break
                            }
                        }

                        if (!active) {
                            className += ' myapp-comp-tictactoe-board-square-inactive'
                        }
                        else if (isWinSquare){
                            className += ' myapp-comp-tictactoe-board-square-win'
                        }
                        else {
                            className += ' myapp-comp-tictactoe-board-square'
                        }

                        return (
                            <button type="button"
                                key={y}
                                className={className}
                                onClick={() => dropPiece(x, y)}
                            >
                                {drawPiece(square)}
                            </button>
                        )
                    })}
                </div>
            )
        })

    return (
        <div className='myapp-comp-tictactoe'>
            {board}
            {active &&
            <GameHistory currentStep={currentStep}
                goToStep={goToStep}
            />}
        </div>
    )
}
