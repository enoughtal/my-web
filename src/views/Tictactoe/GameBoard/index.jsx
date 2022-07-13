import '../index.sass'
import History from './History'

function GameBoard({ active, snapshot, dropPiece, currentStep, goToStep, winCoordinates }) {

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
                <div className='myapp-tic-main-center-board-row'
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
                            className += ' myapp-tic-main-center-board-square-inactive'
                        }
                        else if (isWinSquare){
                            className += ' myapp-tic-main-center-board-square-win'
                        }
                        else {
                            className += ' myapp-tic-main-center-board-square'
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
        <div className='myapp-tic-main-center'>
            {board}
            {active &&
            <History currentStep={currentStep}
                goToStep={goToStep}
            />}
        </div>
    )
}

export default GameBoard