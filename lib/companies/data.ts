import { mergeCompanyCatalog } from "./catalog"
import { officialCompanies } from "./generated-data"
import { sampleCompanies } from "./sample-data"

export const allCompanies = mergeCompanyCatalog({ official: officialCompanies, sample: sampleCompanies })
