'use client'

import Image from "next/image"

export default function ImagePreview ({ source }) {
    const supportedFormats = ['jpg', 'jpeg', 'png'];
    const format = getFormatFromBase64String(source, supportedFormats);

    return <Image src={`data:image/${format};base64, ${source}`} alt="image" width={100} height={100} layout="fixed"/>
}

function getFormatFromBase64String(base64String, supportedFormats) {
    const prefix = 'data:image/';
    const startIndex = base64String?.indexOf(prefix);
  
    if (startIndex === 0) {
      const formatStart = startIndex + prefix.length;
      const formatEnd = base64String.indexOf(';', formatStart);
  
      if (formatEnd > formatStart) {
        const format = base64String.substring(formatStart, formatEnd);
        if (supportedFormats.includes(format)) {
          if (format === 'jpeg') {
            return 'jpg'; // Treat 'jpeg' as 'jpg'
          }
          return format;
        }
      }
    }
  
    return null; // Invalid or unsupported data URI
}