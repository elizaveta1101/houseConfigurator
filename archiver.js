const fs = require('fs')
const archiver = require('archiver')

const PACKAGE_JSON = require('./package.json')

const BUILD_FOLDER_NAME = 'build'
const ARCHIVE_DIRECTORY_NAME = 'zip'
const PRESENTAION_NAME = PACKAGE_JSON.name

if (!fs.existsSync(ARCHIVE_DIRECTORY_NAME)) {
  fs.mkdirSync(ARCHIVE_DIRECTORY_NAME)
}

const output = fs.createWriteStream(`${__dirname}/${ARCHIVE_DIRECTORY_NAME}/${PRESENTAION_NAME}.zip`)
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
})

output.on('close', () => {
  const size = archive.pointer()
  const sizeMb = (size / 1024 / 1024).toFixed(2)
  console.log(`presName: ${PRESENTAION_NAME}, Size: ${sizeMb} MB`) // eslint-disable-line no-console
  // console.log('archiver has been finalized and the output file descriptor has closed.')
})

output.on('end', () => console.log('Data has been drained')) // eslint-disable-line no-console

archive.on('warning', err => {
  if (err.code === 'ENOENT') {
    console.log('No such file OR directory') // eslint-disable-line no-console
  } else {
    throw err
  }
})

archive.on('error', err => {
  throw err
})

archive.pipe(output)
archive.directory(`${BUILD_FOLDER_NAME}/`, false)
archive.finalize()
