const rp = require('request-promise')
const otcsv = require('objects-to-csv')
const cheerio = require('cheerio')

let baseUrl = 'https://ndcsydney.com'
let agendaPath = '/agenda'
let agendaDayUrl = (day) => `${baseUrl}${agendaPath}/?day=${day}`

let days = [
  'wednesday',
  'thursday',
  'friday'
]

const scrapeTalks = async () => {

  let talkUrls = []

  // loop through the agenda days
  days.forEach(async (day) => {

    console.log(`Scraping agenda for ${day}`)

    await scrapeAgendaDay(agendaDayUrl(day))

    console.log(talkUrls)
  })

  return Promise.resolve()
};


async function scrapeAgendaDay(agendaUrl) {
  let html = await rp(agendaUrl)
  let talkUrls = cheerio('.boxed-talk', html).map(async (i, e) => e.attribs.href).get()
  return talkUrls.map((talkUrl) => { { talkUrl } })
}

// async function scrapeTalkDetails(talkUrl) {
//   let html = await rp(talkUrl)

//   let talkDetails = cheerio('', html)

//   return Promise.all(businessMap)
// }

scrapeTalks()
