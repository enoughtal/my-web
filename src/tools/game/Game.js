class Piece {
    constructor() {
        this.horizontal = 0
        this.vertical = 0
        this.leftDiagonal = 0
        this.rightDiagonal = 0
        this.coordX = -1
        this.coordY = -1
    }

    setPiece(x, y) {
        this.horizontal = 1
        this.vertical = 1
        this.leftDiagonal = 1
        this.rightDiagonal = 1
        this.coordX = x
        this.coordY = y
    }

    getCoordinate() {
        return [this.coordX, this.coordY]
    }
}

class Pieces {
    constructor(sideLength, order) {
        const pieces = []
        for (let i = 0; i < sideLength; i ++) {
            const row = []
            for (let j = 0; j < sideLength; j ++) {
                row.push(new Piece())
            }
            pieces.push(row)
        }
        this.pieces = pieces
        this.order = order
        this.sideLength = sideLength
        this.curPiece = null
        this.isWin = false
        this.winThreePieces = []
    }

    static fourLines = {
        horizontal: [[0, -1], [0, 1]],
        vertical: [[-1, 0], [1, 0]],
        leftDiagonal: [[-1, -1], [1, 1]],
        rightDiagonal: [[-1, 1], [1, -1]],
    }

    setCurrentPiece(x, y) {
        this.pieces[x][y].setPiece(x, y)
        this.curPiece = this.pieces[x][y]
    }

    getSnapshot() {
        return this.pieces.map(row => row.map(cell => cell.horizontal ? this.order : 0))
    }

    checkWin(winNum) {
        for (const [line, vectors] of Object.entries(Pieces.fourLines)) {
            const adjPieces = []/* adjacent 2 pieces along a line */

            vectors.forEach(vector => {
                const newX = this.curPiece.coordX + vector[0]
                const newY = this.curPiece.coordY + vector[1]
                const adjPiece = (
                    newX >= 0
                    && newX < this.sideLength
                    && newY >= 0
                    && newY < this.sideLength
                )
                    ? this.pieces[newX][newY]
                    : new Piece()
                this.curPiece[line] += adjPiece[line]
                adjPieces.push(adjPiece)
            })

            adjPieces.forEach(piece => {
                if (piece[line] > 0) piece[line] = this.curPiece[line]
            })

            if (this.curPiece[line] >= winNum) {
                const coord = this.curPiece.getCoordinate()
                this.winThreePieces =
                    vectors
                        .map(vector => [
                            (vector[0] + coord[0] + 3) % 3,
                            (vector[1] + coord[1] + 3) % 3
                        ])
                        .concat([coord])

                return this.isWin = true
            }
        }
        return false
    }
}

class Player {
    constructor(name, pieces) {
        this.name = name
        this.pieces = pieces
    }

    dropAndCheck(x, y, winNum) {
        this.pieces.setCurrentPiece(x, y)
        this.pieces.checkWin(winNum)
    }

    getIsWinner() {
        return this.pieces.isWin
    }

    getOrder() {
        return this.pieces.order
    }

    getWinCoordinates() {
        return this.pieces.winThreePieces
    }
}

class Game {
    constructor(mode, sideLength = 3, winNum = 3) {
        let p1Name, p2Name
        switch (mode) {
            case '0': {
                p1Name = 'sword'
                p2Name = 'shield'
                break
            }
            case '1': {
                p1Name = 'you'
                p2Name = 'ai'
                break
            }
            case '2': {
                p1Name = 'ai'
                p2Name = 'you'
                break
            }
        }
        this.mode = mode
        this.player1 = new Player(p1Name, new Pieces(sideLength, 1))
        this.player2 = new Player(p2Name, new Pieces(sideLength, 2))
        this.sideLength = sideLength
        this.winNum = winNum
        this.winner = null
        this.allSnapshots = [this.getGameSnapshot()]
    }

    getCurrentStep() {
        return this.allSnapshots.length - 1
    }

    getCurrentSnapshot() {
        return this.allSnapshots[this.allSnapshots.length - 1]
    }

    getHistorySnapshot(step) {
        return this.allSnapshots[step]
    }

    getNowPlayer() {
        if ((this.getCurrentStep() + 1) % 2 === this.player1.pieces.order)
            return this.player1
        return this.player2
    }

    isAiNext() {
        return this.getNowPlayer().name === 'ai'
    }

    getCurrentPlayer() {
        if ((this.getCurrentStep()) % 2 === this.player1.pieces.order)
            return this.player1
        return this.player2
    }

    getIsDraw() {
        return this.getCurrentStep() === this.sideLength * this.sideLength
    }

    getIsGameOver() {
        return this.getIsDraw() || this.winner
    }

    getGameSnapshot() {
        const arr1 = this.player1.pieces.getSnapshot()
        const arr2 = this.player2.pieces.getSnapshot()
        const gameSnapshot = []
        for (let i = 0; i < this.sideLength; i ++) {
            gameSnapshot[i] = []
            for (let j = 0; j < this.sideLength; j ++) {
                if (arr1[i][j]) gameSnapshot[i][j] = arr1[i][j]
                else if (arr2[i][j]) gameSnapshot[i][j] = arr2[i][j]
                else gameSnapshot[i][j] = 0
            }
        }
        return gameSnapshot
    }

    determineDrop(x, y) {
        return !this.getIsGameOver() && !this.getCurrentSnapshot()[x][y]
    }

    updateAllSnapshots() {
        this.allSnapshots.push(this.getGameSnapshot())
    }

    judgeAndRecord(x, y) {
        if (!this.determineDrop(x, y)) return { info: 'ignore' }
        this.getNowPlayer().dropAndCheck(x, y, this.winNum)
        this.updateAllSnapshots()
        if (this.getCurrentPlayer().getIsWinner()) {
            this.winner = this.getCurrentPlayer()

            return {
                done: 'win',
                info: this.winner.name,
                winCoordinates: this.winner.getWinCoordinates()
            }
        }
        if (this.getIsDraw()) {
            return {
                done: 'draw',
                info: 'draw'
            }
        }

        return { info: 'continue' }
    }
}

export default Game