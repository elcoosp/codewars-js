const go = {
  north: ([row, col]) => [row - 1, col],
  east: ([row, col]) => [row, col + 1],
  south: ([row, col]) => [row + 1, col],
  west: ([row, col]) => [row, col - 1]
}
const isEqualTuple = (a, b) => a[0] === b[0] && a[1] === b[1]
const isOutOfBounds = (coords, maze) =>
  coords.some(x => x > maze.length - 1 || x < 0)
const isWall = ([x, y], maze) => maze[x] && maze[x][y] === 'W'

const isTotallyExplored = (maze, explored) =>
  explored.length === maze.length &&
  explored.every(row => row.length === maze[0].length)

const pathFinder = mazeString => {
  let maze = mazeString.split('\n'),
    coords = [0, 0],
    goal = [maze.length - 1, maze.length - 1],
    explored = [[true]],
    isSolvable = false
  console.log(isTotallyExplored(maze, explored))

  while (!isTotallyExplored(maze, explored)) {
    for (const direction in go) {
      coords = go[direction](coords)

      if (isEqualTuple(coords, goal)) {
        isSolvable = true
        break
      }
      if (isOutOfBounds(coords, maze)) continue
      if (isWall(coords, maze)) continue
    }
  }

  return isSolvable
}

console.log(
  pathFinder(
    `.W.
    ...
    W..`
  )
)
