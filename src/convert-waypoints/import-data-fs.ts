import neatCsv from 'neat-csv'
import fs from 'fs'

export const getCsvDataFromFileSystem = async (file: string): Promise<Object[]> => {
  return await neatCsv(fs.readFileSync(file))
}
