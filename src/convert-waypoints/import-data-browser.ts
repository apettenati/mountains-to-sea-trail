import Papa from 'papaparse'

export async function getCsvDataFromBrowser(file: File) {
  return await new Promise<Papa.ParseResult<Object[]>>(function (complete, error) {
    Papa.parse(file, { header: true, complete, error, skipEmptyLines: true })
  })
}

export function createNewWaypointFile(newWaypoints: any) {
  return Papa.unparse(newWaypoints, { header: true})

}