document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const endMessage = document.querySelector('.end h3');
    const restartLink = document.querySelector('.end a');

    let currentPlayer = 'X';
    let moves = 0;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent === currentPlayer &&
                cells[b].textContent === currentPlayer &&
                cells[c].textContent === currentPlayer) {
                return true;
            }
        }
        return false;
    }

    function handleCellClick(index) {
        if (cells[index].textContent === '' && !endMessage.textContent) {
            cells[index].textContent = currentPlayer;
            moves++;

            if (checkWinner()) {
                endMessage.textContent = `Player ${currentPlayer} wins!`;
                showEndMessage();
            } else if (moves === 9) {
                endMessage.textContent = 'It\'s a draw!';
                showEndMessage();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function showEndMessage() {
        document.querySelector('.end').style.display = 'block';
    }

    restartLink.addEventListener('click', function () {
        cells.forEach(cell => {
            cell.textContent = '';
        });

        currentPlayer = 'X';
        moves = 0;
        endMessage.textContent = '';
        document.querySelector('.end').style.display = 'none';
    });

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
});
