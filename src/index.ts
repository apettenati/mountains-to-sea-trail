import { 
  totalDistance, associateWaypointsWithTrackpoints, getCsvDataFromBrowser,
  checkOutliers, calcDistance, cleanTrackpointData, cleanWaypointData, createNewWaypointFile
} from './convert-waypoints'

async function tests() {
  // const trackpointFile = './segment-8-data/trackpoints-segment8.csv'
  // const waypointFile = './segment-8-data/waypoints-segment8.csv'
  // const trackpoints = await getTrackpointData(trackpointFile)
  // const waypoints = await getWaypointData(waypointFile)
  // const dist = calcDistance(trackpoints[0].coordinate, trackpoints[6574].coordinate)
  // const totalMiles = totalDistance(trackpoints)
  // // console.log({ dist, totalMiles })
  // const newWaypoints = associateWaypointsWithTrackpoints(waypoints, trackpoints)
  // // console.log({ newWaypoints })
  // const outliers = checkOutliers(newWaypoints, 0.05)
  // // console.log({ outliers })
  console.log('test')
}

tests()

function convertWaypoints(rawWaypoints: any, rawTrackpoints: any) {
  const trackpoints = cleanTrackpointData(rawTrackpoints)
  const waypoints = cleanWaypointData(rawWaypoints)
  const newWaypoints = associateWaypointsWithTrackpoints(waypoints, trackpoints)
  console.log({newWaypoints})
  return newWaypoints
}

function downloadNewWaypointsJSON(data: any) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  const anchorElement = document.createElement('a')
  anchorElement.setAttribute('href', dataStr)
  anchorElement.setAttribute('download', 'newWaypoints.json')
  const textNode = document.createTextNode('Download New Waypoints')
  anchorElement.appendChild(textNode)
  anchorElement.click()
  document.querySelector('.file-upload')?.appendChild(anchorElement)
}

function downloadNewWaypointsCSV(data: any) {
  const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  const anchorElement = document.createElement('a')
  anchorElement.setAttribute('href', dataStr)
  anchorElement.setAttribute('download', 'newWaypoints.json')
  const textNode = document.createTextNode('Download New Waypoints')
  anchorElement.appendChild(textNode)
  anchorElement.click()
  document.querySelector('.file-upload')?.appendChild(anchorElement)
}

function convertListener() {
  const trackpointFiles = document.querySelector<HTMLInputElement>('.trackpoint-data')?.files
  const waypointFiles = document.querySelector<HTMLInputElement>('.waypoint-data')?.files
  const convertSubmit = document.querySelector<HTMLInputElement>('[type="submit"]')

  convertSubmit?.addEventListener('click', async (event) => {
    if (!trackpointFiles) throw new Error('Trackpoint file not uploaded!')
    const trackpointData = (await getCsvDataFromBrowser(trackpointFiles[0])).data
    console.log({trackpointData})
    if (!waypointFiles) throw new Error('Waypoint file not uploaded!')
    const waypointData = (await getCsvDataFromBrowser(waypointFiles[0])).data

    const newWaypoints = convertWaypoints(waypointData, trackpointData)
    console.log({newWaypoints})

    downloadNewWaypointsJSON(newWaypoints)

    // const newCsv = createNewWaypointFile(newWaypoints)
    // console.log({newCsv})
    // downloadNewWaypointsCSV(newCsv)

  })
}

convertListener()