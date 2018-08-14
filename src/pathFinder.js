const isGoal = (a, b) => a[0] === b[0] && a[1] === b[1]
const isOutOfBounds = (coords, maze) => coords.some(x => x > maze.length - 1)
const isNotOpen = ([x, y], maze) => maze[x][y] !== '.'

const pathFinder = (
  maze,
  coords = [0, 0],
  solution = [],
  goal = [maze.length - 1, maze.length - 1]
) => {
  // Outside of maze bounds
  if (isOutOfBounds(coords, maze)) return false
  // We reached the goal
  if (isGoal(coords, goal)) return true
  // Current position is not valid
  if (isNotOpen(coords, maze)) return false
  else {
    // Mark coords as part of the solution
  }
}
