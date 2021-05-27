const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk != null) {
    console.log('Chunk: ', chunk);
    const buffer = Buffer.from([chunk]);
    console.log('Buffer: ', buffer);
    console.log('With .toString()', buffer.toString());
    console.log('With StringDecoder', decoder.write(buffer));
  }
});

/**
 * inputs:
 * 0xE2
 * 0x82
 * 0xAC
 *  */ 

// NAO FUNCiONA COM STDIN
//  process.stdin.on('readable', 'utf8', () => {
//   const chunk = process.stdin.read();
//   if (chunk != null) {
//     console.log('With encoding:\n');
//     console.log('Chunk: ', chunk);
//     const buffer = Buffer.from([chunk]);
//     console.log('Buffer: ', buffer);
//     console.log('With .toString()', buffer.toString());
//     console.log('With StringDecoder', decoder.write(buffer));
//   }
// });
