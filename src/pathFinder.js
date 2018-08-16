const isGoal = (a, b) => a[0] === b[0] && a[1] === b[1]
const isOutOfBounds = (coords, maze) =>
  coords.some(x => x > maze.length - 1 || x < 0)
const isWall = ([x, y], maze) => maze[x] && maze[x][y] === 'W'
const isExplored = (coords, explored) =>
  explored[coords[0]] &&
  (explored[coords[0]][coords[1]] === true ||
    explored[coords[0]][coords[1]] === false)

const addExplored = (coords, explored) => (
  explored[coords[0]]
    ? (explored[coords[0]][coords[1]] = true)
    : (explored[coords[0]] = []) && (explored[coords[0]][coords[1]] = true),
  explored
)

const go = {
  north: ([x, y]) => [x, y - 1],
  east: ([x, y]) => [x + 1, y],
  south: ([x, y]) => [x, y + 1],
  west: ([x, y]) => [x - 1, y]
}

const pathFinder = (
  maze,
  coords = [0, 0],
  explored = [[]],
  goal = [maze.length - 1, maze.length - 1]
) => {
  console.log(coords)

  if (isExplored(coords, explored)) return explored[coords[0]][coords[1]]
  if (isOutOfBounds(coords, maze)) return false
  if (isWall(coords, maze)) return false
  if (isGoal(coords, goal)) return true
  else {
    // Mark coords as part of the solution
    for (const direction of ['north', 'east', 'south', 'west'])
      if (pathFinder(maze, go[direction](coords), explored)) return true

    return false
  }
}

console.log(
  pathFinder(`.W.
  .W.
  W..`)
)
