export default function Functions () {
    function getFormatFromBase64String(base64String, supportedFormats) {
        const prefix = 'data:image/';
        const startIndex = base64String.indexOf(prefix);
      
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

    return {getFormatFromBase64String}
}