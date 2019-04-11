

const download = require('image-downloader')

// const options = {
//   url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0e',
//   dest: './user/images/'
// }


module.exports = {
downloadIMG:  async function downloadIMG(options) {
  try {
    const { filename, image } = await download.image(options)
    console.log(filename) // => /path/to/dest/image.jpg
  } catch (e) {
    console.error(e)
  }
}
};
